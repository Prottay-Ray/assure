package com.constructWeek3.assure.service;

import com.constructWeek3.assure.dto.ClaimDTO;
import com.constructWeek3.assure.dto.PolicyBookingInputDTO;
import com.constructWeek3.assure.entity.*;
import com.constructWeek3.assure.exception.UserDoesNotExistException;
import com.constructWeek3.assure.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClaimService {
    @Autowired
    ClaimsRepository claimsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MembersRepository membersRepository;

    @Autowired
    PolicyBookingsRepository policyBookingsRepository;

    @Autowired
    HospitalsRepository hospitalsRepository;


    public String getUserName(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) throw new UserDoesNotExistException("Invalid User Id.");
        return user.get().getUserName();
    }

    public Claim claimInsurance(Long policyBookingId, Long userId, Long memberId, Claim claim, String hospitalName) {
        claim.setSubmissionDate(new Date());
        claim.setStatus("Processing");
        claimsRepository.save(claim);
        User user = userRepository.findById(userId).get();
        user.addClaim(claim);
        userRepository.save(user);

        claim.setUser(user);
        claimsRepository.save(claim);

        Members member = membersRepository.findById(memberId).get();
        member.addClaim(claim);
        membersRepository.save(member);
        claim.setMember(member);
        claimsRepository.save(claim);

        PolicyBookings policyBookings = policyBookingsRepository.findById(policyBookingId).get();
        policyBookings.addClaim(claim);
        policyBookingsRepository.save(policyBookings);
        claim.setPolicyBookings(policyBookings);
        claimsRepository.save(claim);


        if(hospitalName!=null){
            List<Hospitals> hospital = hospitalsRepository.findAll();
            for(int i=0;i<hospital.size();i++){
                if(hospital.get(i).getName().equals(hospitalName)){
                    hospital.get(i).addClaim(claim);
                    hospitalsRepository.save(hospital.get(i));
                    claim.setHospitals(hospital.get(i));
                    claimsRepository.save(claim);
                    break;
                }
            }
        }


        return claim;
    }

    public List<Claim> getAllTheClaims(Long userId) {
        List<Claim> listOfAll = claimsRepository.findAll();
        List<Claim> list = new ArrayList<>();
        for(int i=0;i<listOfAll.size();i++){
            if(listOfAll.get(i).getUser().getUserId()==userId) list.add(listOfAll.get(i));
        }
        Collections.reverse(list);
        return list;
    }
}
