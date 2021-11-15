package com.constructWeek3.assure.controller;

import com.constructWeek3.assure.dto.*;
import com.constructWeek3.assure.service.PolicyBookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PolicyBookingController {

    @Autowired
    private PolicyBookingsService policyBookingsService;

    //Get all policies booked by an user for the profile section
    @GetMapping("/bookings/{userId}")
    public ResponseEntity<List<PolicyBookingsGetListDTO>> getBookedPolicies(@PathVariable Long userId) {
        List<PolicyBookingsGetListDTO> policies = policyBookingsService.getBookedPolicies(userId);
        return new ResponseEntity<>(policies, HttpStatus.FOUND);
    }

    //An user of particular userId books a policy with all it's members
    @PostMapping("/booking/{userId}/{policyId}")
    public ResponseEntity<PolicyBookingInputDTO> bookPolicy(@PathVariable Long userId, @PathVariable Long policyId, @RequestBody PolicyBookingInputDTO policyBookingInputDTO) throws ParseException, Exception {
        PolicyBookingInputDTO bookingInputDTO = policyBookingsService.bookPolicy(userId, policyId, policyBookingInputDTO);
        return new ResponseEntity<>(bookingInputDTO, HttpStatus.CREATED);
    }

    //Check whether a member details is valid for policy booking
    @PostMapping("/booking/validate/member")
    public ResponseEntity<Boolean> validateMember(@RequestBody MembersDTO membersDTO) throws Exception{
        return new ResponseEntity<>(policyBookingsService.validateMember(membersDTO), HttpStatus.OK);
    }

    @GetMapping("/booking/hospital/{userId}")
    public ResponseEntity<List<HospitalLocationDTO>> fetchHospitals(@PathVariable Long userId) {
        return new ResponseEntity<>(policyBookingsService.fetchHospitals(userId), HttpStatus.FOUND);
    }

    @GetMapping("/booking/latest/{userId}")
    public ResponseEntity<LatestClaimDTO> fetchLatest(@PathVariable Long userId) {
        return new ResponseEntity<>(policyBookingsService.fetchLatest(userId), HttpStatus.FOUND);
    }


}
