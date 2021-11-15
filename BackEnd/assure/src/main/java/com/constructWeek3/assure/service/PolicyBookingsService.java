package com.constructWeek3.assure.service;

import com.constructWeek3.assure.dto.*;
import com.constructWeek3.assure.entity.*;
import com.constructWeek3.assure.exception.*;
import com.constructWeek3.assure.repository.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PolicyBookingsService {

    @Autowired
    private PolicyBookingsRepository policyBookingsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private MembersRepository membersRepository;

    @Autowired
    private ClaimService claimService;

    @Autowired
    private PolicyService policyService;

    @Autowired
    private ModelMapper modelMapper;

    Set<String> relations = new HashSet<>(Arrays.asList("self", "father", "mother", "son", "daughter", "spouse"));

    public String isValidEmail(String email) {
        int at = email.indexOf('@');
        if (at < 5) return "Your email has less than 6 characters before @ sign";
        if (at != email.lastIndexOf('@')) return "Your email has 2 @ signs.";
        if(email.lastIndexOf('.') < at) return "Invalid domain name.";
        if(Character.isDigit(email.charAt(0))) return "A valid email cannot start with a digit.";
        return "";
    }

    public Date toDate(String date) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
        return formatter.parse(date);
    }

    public Boolean isValidMobile(String number) {

        Pattern mobNoPattern = Pattern.compile("[5-9][0-9]{9}");

        Matcher mobNoMatcher = mobNoPattern.matcher(number);
        return (mobNoMatcher.find() && mobNoMatcher.group().equals(number));

    }

    public Boolean isValidAadhaar(String aadhaar) {

        Pattern aadhaarNoPattern = Pattern.compile("^[2-9][0-9]{11}$");

        Matcher aadhaarNoMatcher = aadhaarNoPattern.matcher(aadhaar);
        return aadhaarNoMatcher.matches();

    }

    public Boolean isValidGender(String gender) {

        gender = gender.toLowerCase();
        return gender.equals("male") || gender.equals("female") || gender.equals("transgender");

    }

    public Boolean isValidName(String name) {

        char ch;
        for (int i = 0; i < name.length(); i++) {

            ch = name.charAt(i);
            if (!Character.isLetter(ch) && ch != '.' && ch != ' ') return false;

        }
        return true;

    }

    public PolicyBookingInputDTO bookPolicy(Long userId, Long policyId, PolicyBookingInputDTO policyBookingInputDTO) throws Exception {

        //Checking for any inconsistency in the input data

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new UserDoesNotExistException("No policy could be booked because the User does not exist!");

        Optional<Policy> policy = policyRepository.findById(policyId);
        if (policy.isEmpty()) throw new PolicyDoesNotExistException("The policy that you chose does not exist, so no policy could be booked.");

        if (!Objects.equals(policy.get().getCoverAmount1(), policyBookingInputDTO.getCoverAmount()) && !Objects.equals(policy.get().getCoverAmount2(), policyBookingInputDTO.getCoverAmount()) && !Objects.equals(policy.get().getCoverAmount3(), policyBookingInputDTO.getCoverAmount()))
            throw new CoverAmountNotSupportedException("Invalid cover amount specified for the chosen policy.");

        if (!Objects.equals(policy.get().getTenure1(), policyBookingInputDTO.getCoverTenure()) && !Objects.equals(policy.get().getTenure2(), policyBookingInputDTO.getCoverTenure()) && !Objects.equals(policy.get().getTenure3(), policyBookingInputDTO.getCoverTenure()))
            throw new CoverTenureNotSupportedException("Invalid cover tenure specified for the chosen policy.");

        Set<String> relation = new HashSet<>();

        Float premium = 0.0F;

        Set<MembersDTO> membersDTOS = policyBookingInputDTO.getMembers();

        for (MembersDTO member :
                membersDTOS) {

            validateMember(member);

            Date d = new Date();
            premium += policyService.ageToPremium(policy.get(),d.getYear() - toDate(member.getDob()).getYear());

            String rel = member.getRelation_with_user().toLowerCase();

            if (!(rel.equals("son") || rel.equals("daughter")) && (relation.isEmpty() || !(relation.contains(rel))))
                relation.add(rel);
            else if (!(rel.equals("son") || rel.equals("daughter")))
                throw new DuplicateMemberException("There cannot be two members who are your " + rel + ".");

        }

        if (!premium.equals(policyBookingInputDTO.getPremium())) throw new InvalidPremiumException("The specified premium is not valid");

        //Processing request after validation of consistency of input data.

        PolicyBookings policyBooking = new PolicyBookings();
        policyBooking.setUser(user.get());
        policyBooking.setPolicy(policy.get());
        policyBooking.setPolicyName(policy.get().getPolicyName());
        policyBooking.setBookingDate(new Date());
        modelMapper.map(policyBookingInputDTO, policyBooking);
        policyBooking.setMembers(new HashSet<>());


        policyBookingsRepository.save(policyBooking);
        policy.get().addPolicyBooking(policyBooking);
        policyRepository.save(policy.get());

        for (MembersDTO member :
                membersDTOS) {

            Members actualMember = new Members();
            modelMapper.map(member, actualMember);
            actualMember.setPolicyBookings(policyBooking);
            actualMember.setDOB(toDate(member.getDob()));
            membersRepository.save(actualMember);
            policyBooking.addMember(actualMember);
        }

        user.get().setPolicyBookings(policyBooking);
        userRepository.save(user.get());
        policyBookingsRepository.save(policyBooking);

        return policyBookingInputDTO;
    }

    public List<PolicyBookingsGetListDTO> getBookedPolicies(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new UserDoesNotExistException("No policy bookings could be found because the User does not exist!");

        List<PolicyBookings> policyBookings = user.get().getPolicyBookingsList();

        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        List<PolicyBookingsGetListDTO> list = modelMapper.map(policyBookings, new TypeToken<List<PolicyBookingsGetListDTO>>() {}.getType());
        for (PolicyBookingsGetListDTO policy :
                list) {

            policy.setUserName(user.get().getUserName());

            Calendar c = Calendar.getInstance();
            c.setTime(policy.getBookingDate());
            c.add(Calendar.YEAR, policy.getCoverTenure());
            policy.setValidTillDate(c.getTime());

        }
        Collections.reverse(list);
        return list;
    }

    public Boolean validateMember(MembersDTO member) throws Exception{

        if (!isValidMobile(member.getMobile())) throw new InvalidMobileNumberException("Enter a correct 10 digit mobile number without starting with appending country code or 0.");
        if (!isValidGender(member.getGender())) throw new InvalidGenderException("Gender can be either male, female or transgender. (Case-Insensitive)");
        String message = isValidEmail(member.getEmail());
        if (message.length() > 0) throw new InvalidEmailException(message);
        if (member.getIs_taking_medicines() == null || member.getMartial_status() == null || member.getEmail().equals("") || member.getGender().equals("") || member.getMobile().equals("") || member.getCity().equals("") || member.getDob() == null || member.getHeight().equals("") || member.getOccupation().equals("") || member.getRelation_with_user().equals("") || member.getWeight() == 0.0F || member.getName().equals("") || member.getAadhaar().equals(""))
            throw new InsufficientMemberDetailsException("Required Details of all members are partially provided or not provided.");
        if (!relations.contains(member.getRelation_with_user().toLowerCase())) throw new InvalidRelationException("Please enter a valid relation with user.");
        if (!isValidName(member.getName())) throw new InvalidNameException("Name of " + member.getRelation_with_user().toLowerCase() + " is not any valid name.");
        if (!isValidAadhaar(member.getAadhaar())) throw new InvalidAadhaarNumberException("An invalid aadhaar number has been entered");

        return true;

    }

    public List<HospitalLocationDTO> fetchHospitals(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new UserDoesNotExistException("No policy bookings could be found because the User does not exist!");

        List<HospitalLocationDTO> list = new ArrayList<>();
        List<PolicyBookings> policyBookings = user.get().getPolicyBookingsList();

        for (PolicyBookings policy :
                policyBookings) {

            Set<Hospitals> hospitals = policy.getPolicy().getHospitals();
            for (Hospitals hospital :
                    hospitals) {
                list.add(new HospitalLocationDTO(policy.getBookingId(), policy.getPolicyName(), hospital.getLocation().getName(), hospital.getName()));
            }

        }

        return list;

    }

    public LatestClaimDTO fetchLatest(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new UserDoesNotExistException("User does not exist!");

        List<Claim> claims = claimService.getAllTheClaims(userId);

        LatestClaimDTO latestClaimDTO = new LatestClaimDTO();
        latestClaimDTO.setUserName(user.get().getUserName());
        latestClaimDTO.setIsBookingThere(Boolean.FALSE);
        latestClaimDTO.setIsClaimThere(Boolean.FALSE);

        if (claims.isEmpty()) {

            List<PolicyBookingsGetListDTO> policyBookings = getBookedPolicies(userId);
            if (policyBookings.isEmpty()) {
                return latestClaimDTO;
            }
            PolicyBookingsGetListDTO policyBooking = policyBookings.get(0);
            modelMapper.map(policyBooking, latestClaimDTO);
            latestClaimDTO.setIsBookingThere(Boolean.TRUE);
            latestClaimDTO.setIsClaimThere(Boolean.FALSE);
            latestClaimDTO.setMemberId(policyBooking.getMembers().get(0).getMember_id());
            latestClaimDTO.setMemberCount(policyBooking.getMembers().size());
            return latestClaimDTO;

        }
        Claim claim = claims.get(0);
        modelMapper.map(claim, latestClaimDTO);
        latestClaimDTO.setIsClaimThere(Boolean.TRUE);
        latestClaimDTO.setMemberId(claim.getMember().getMember_id());
        return latestClaimDTO;

    }
}
