package ecp.spring.web;

import ecp.spring.model.Person;
import ecp.spring.model.PersonDTO;
import ecp.spring.model.PersonModel;
import ecp.spring.model.Role;
import ecp.spring.model.ContactInfo;
import ecp.spring.service.PersonManagerImpl;
import ecp.spring.service.RoleManagerImpl;
import ecp.spring.service.PersonTransformer;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.security.access.annotation.Secured;
import org.springframework.http.MediaType;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.ui.ModelMap;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@Controller
public class PersonController{

	List<String> currentRoles = new ArrayList<String>();

	@Autowired
	PersonManagerImpl personManagerImpl;

	@Autowired
	RoleManagerImpl roleManagerImpl;

	@Autowired
	PersonValidator personValidator;

	@Autowired
	PersonFileParser personFileParser;

	@Autowired
	PersonTransformer personTransformer;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}

	@RequestMapping(value="/", method=RequestMethod.GET)
	public String showIndex(ModelMap model){
		return "person/index";
	}

	@RequestMapping(value="/person/add", method=RequestMethod.GET)
	public String addPersonGet(ModelMap model){
		model.addAttribute("action", "add");
		model.addAttribute("method", "PUT");
		return "person/personForm";
	}


	@RequestMapping(value="/person/edit/", method=RequestMethod.GET)
	public String editPersonGet(ModelMap model){
		model.addAttribute("action", "edit");
		model.addAttribute("method", "PUT");
		return "person/personForm";
	}

	@RequestMapping(value="/person/upload", method=RequestMethod.GET)
	public String uploadFileGet(){
		return "upload";
	}

	@RequestMapping(value="/person/upload", method=RequestMethod.POST)
	public String uploadFilePost(ModelMap model, @RequestParam(value="file") MultipartFile file){
		PersonDTO person = new PersonDTO();
		if(file != null){
			person = personFileParser.extractPersonFromFile(file);
		}
		personManagerImpl.addPerson(personTransformer.toPerson(person));
		return "redirect:/";
	}

	//////////////////////////////////////////////////////////////
	//REST METHODS

	@RequestMapping(value="/person/list", headers="Accept=application/json")
	@ResponseBody
	public List listPersonJSON(@RequestParam("role") Integer role,
						   @RequestParam("order") Integer order,
						   @RequestParam("column") String column){
		return personManagerImpl.listPerson(role,order,column);
	}

	@RequestMapping(value="/person/delete/{id}", method=RequestMethod.DELETE, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean deletePersonJSON(@PathVariable int id){
		try{
			personManagerImpl.deletePerson(personManagerImpl.getPerson(id));
			return true;
		} catch (Exception e){
			return false;
		}
	}

	@RequestMapping(value="/person/edit",
                    method=RequestMethod.PUT,
                    produces=MediaType.APPLICATION_JSON_VALUE,
                    consumes=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public boolean editPersonJSON(@RequestBody Person person,
                                    ModelMap model, @RequestParam("roles") Integer[] roleIds) {
    	try{
    		Set<Role> roles = new HashSet<Role>();
    		for(Integer roleId : roleIds){
    			Role role = roleManagerImpl.getRole(roleId);
    			roles.add(role);
    		}
    		person.setRoles(roles);
        	personManagerImpl.updatePerson(person);
        	return true;
        } catch (Exception e){
        	e.printStackTrace();
        	return false;
        }
    }

	@RequestMapping(value="/person/add",
                    method=RequestMethod.PUT,
                    produces=MediaType.APPLICATION_JSON_VALUE,
                    consumes=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public boolean addPersonJSON(@RequestBody Person person,
                                    ModelMap model, @RequestParam("roles") Integer[] roleIds) {
    	try{
    		Set<Role> roles = new HashSet<Role>();
    		for(Integer roleId : roleIds){
    			Role role = roleManagerImpl.getRole(roleId);
    			roles.add(role);
    		}
    		person.setRoles(roles);
        	personManagerImpl.addPerson(person);
        	return true;
        } catch (Exception e){
        	e.printStackTrace();
        	return false;
        }
    }

    @Secured({"ROLE_ADMIN"})
    @RequestMapping(value="/person/{id}", method=RequestMethod.GET)
	public @ResponseBody Person getPersonJSON(@PathVariable int id){
		return personManagerImpl.getPerson(id);
	}

	@RequestMapping(value="/person/associatedRoles", method=RequestMethod.GET, headers="Accept=application/json")
	public @ResponseBody List listAssociatedRoles(){
		return roleManagerImpl.listRolesWithPerson();
	}
}