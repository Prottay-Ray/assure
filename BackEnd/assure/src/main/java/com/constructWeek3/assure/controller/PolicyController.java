package com.constructWeek3.assure.controller;

import com.constructWeek3.assure.dto.PolicyDTO;
import com.constructWeek3.assure.dto.AgeDTO;
import com.constructWeek3.assure.entity.Location;
import com.constructWeek3.assure.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

//    //Get a policy by policyId
//    @GetMapping("/policy/{policyId}")
//    public ResponseEntity<>

    @PostMapping("/explore/policies")
    public ResponseEntity<List<PolicyDTO>> getPolicies(@RequestBody AgeDTO ages) {
        List<PolicyDTO> policyDTOList = policyService.getPolicies(ages);
        return new ResponseEntity<>(policyDTOList, HttpStatus.FOUND);
    }

//    @GetMapping("policy/{id}/hospitals")
//    public ResponseEntity<List<>>


    @PostMapping("policy/{id}/location")
    public ResponseEntity<String> addLocatonForPolicy(@PathVariable("id") Long policyId, @RequestBody Location location){
        String msg = policyService.addLocatonForPolicy(policyId,location);
        return new ResponseEntity<>(msg,HttpStatus.OK);
    }
}
