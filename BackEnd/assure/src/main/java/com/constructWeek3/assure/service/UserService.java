package com.constructWeek3.assure.service;

import com.constructWeek3.assure.AssureApplication;
import com.constructWeek3.assure.dto.AuthenticateUserDTO;
import com.constructWeek3.assure.dto.UserDTO;
import com.constructWeek3.assure.entity.PhoneOTP;
import com.constructWeek3.assure.entity.User;
import com.constructWeek3.assure.exception.EmptyOTP;
import com.constructWeek3.assure.exception.IncorrectOTP;
import com.constructWeek3.assure.exception.UserExists;
import com.constructWeek3.assure.modelmapper.ModelMapperClass;
import com.constructWeek3.assure.repository.PhoneOTP_Repository;
import com.constructWeek3.assure.repository.UserRepository;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.modelmapper.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapperClass modelMapperClass;

    @Autowired
    PhoneOTP_Repository phoneOTP_repository;

    static Logger logger = LoggerFactory.getLogger(AssureApplication.class);

    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public void authenticateUser(MappingJacksonValue mappingJacksonValue) {

        AuthenticateUserDTO authenticateUserDTO = modelMapperClass.modelMapper()
                .map(mappingJacksonValue.getValue(), new TypeToken<AuthenticateUserDTO>() {}.getType());

        List<User> userList = userRepository.findAll();

        for(User i : userList){
            if(i.getUserEmail().equals(authenticateUserDTO.getUserEmail())){
                throw new UserExists("Email Already Registered");
            }
            else if (i.getUserMobile().equals(authenticateUserDTO.getUserMobile())){
                throw new UserExists("Mobile Already Registered");
            }
        }

        List<PhoneOTP> phoneOTPList = phoneOTP_repository.findAll();

        if (!phoneOTPList.isEmpty()){
            for (PhoneOTP p : phoneOTPList){
                if (p.getUserMobile().equals(authenticateUserDTO.getUserMobile())){
                    throw new EmptyOTP("OTP not entered");
                }
            }

            String otp = otpGenerator();

            logger.info(otp);

            sendSMS(authenticateUserDTO.getUserMobile(),otp);

            phoneOTP_repository.save(new PhoneOTP(authenticateUserDTO.getUserMobile(), otp));
        }
        else{

            String otp = otpGenerator();

            logger.info(otp);

            sendSMS(authenticateUserDTO.getUserMobile(),otp);

            phoneOTP_repository.save(new PhoneOTP(authenticateUserDTO.getUserMobile(), otp));
        }

    }

    public Long registerUser(UserDTO userDTO){

        User user = null;

        List<PhoneOTP> phoneOTPList = phoneOTP_repository.findAll();

        for (PhoneOTP p : phoneOTPList){
            if (p.getUserMobile().equals(userDTO.getUserMobile()) && p.getOtp().equals(userDTO.getOtp())){
                SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter
                        .filterOutAllExcept("userName","userEmail","userMobile","userPass");

                FilterProvider filterProvider = new SimpleFilterProvider()
                        .addFilter("UserFilter",filter);

                MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(userDTO);

                mappingJacksonValue.setFilters(filterProvider);

                user = modelMapperClass.modelMapper()
                        .map(mappingJacksonValue.getValue(), new TypeToken<User>() {}.getType());

                userRepository.save(user);

            }
            else if(p.getUserMobile().equals(userDTO.getUserMobile()) && (!p.getOtp().equals(userDTO.getOtp()))){
                throw new IncorrectOTP("Incorrect OTP entered");
            }

        }

        return user.getUserId();
    }

    private String otpGenerator(){
        return Math.round(Math.random()*10)
                + "" + Math.round(Math.random()*10)
                + "" + Math.round(Math.random()*10)
                + "" + Math.round(Math.random()*10);
    }

    private void sendSMS(String mobile, String otp){
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Message.creator(
                            new com.twilio.type.PhoneNumber("+91" + mobile),
                            new com.twilio.type.PhoneNumber("+13186682959"),
                            "Your OTP is : " + otp)
                    .create();
    }
}
