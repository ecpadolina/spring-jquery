package ecp.spring.web;

import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import org.springframework.validation.Errors;

import ecp.spring.model.Project;
import ecp.spring.model.Person;
import ecp.spring.model.Tickets;
import ecp.spring.model.ProjectDTO;

import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class ProjectValidator implements Validator {

    public boolean supports(Class clazz){
        return ProjectDTO.class.equals(clazz);
    }

    public void validate(Object target, Errors errors){
        ProjectDTO project = (ProjectDTO)target;
        Set<Tickets> tickets = project.getTickets();
        boolean personFound = false;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "error.project.name");

        if(project.getStartDate().after(project.getEndDate())){
            errors.rejectValue("endDate", "error.project.endDate");
        }
    }
}
