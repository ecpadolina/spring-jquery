package ecp.spring.web;

import java.util.List;
import org.springframework.ui.ModelMap;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ecp.spring.model.Users;
import ecp.spring.service.UserManagerImpl;

@Controller
public class UserController {

	@Autowired
	private UserManagerImpl userManagerImpl;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@RequestMapping(value="/users")
	public String showUserDash(ModelMap model) {
		List userList = userManagerImpl.listUser();
		model.addAttribute("userList", userList);
		
		return "users";
	}

	@RequestMapping(value="/users/add", method=RequestMethod.GET)
	public String addUser(ModelMap model) {
		Users user = new Users();
		model.addAttribute("user",user);
		
		return "userForm";
	} 

	@RequestMapping(value="/users/add", method=RequestMethod.POST)
	public String saveUser(ModelMap model, @ModelAttribute("user") Users user) {
		String password = encoder.encode(user.getPassword());
		user.setPassword(password);
		userManagerImpl.addUser(user);

		return "redirect:/users";
	}

	@RequestMapping(value ="/users/edit/{id}", method = RequestMethod.GET)
	public String editUser(ModelMap model, @PathVariable int id) {
		Users user = userManagerImpl.getUser(id);
		model.addAttribute("user",user);
		
		return "userForm";
	}

	@RequestMapping(value ="/users/edit/{id}", method = RequestMethod.POST)
	public String updateUser(ModelMap model,  @ModelAttribute("user") Users user) {
		String password = encoder.encode(user.getPassword());
		user.setPassword(password);
		userManagerImpl.updateUser(user);
		
		return "redirect:/users";
	}

	@RequestMapping(value = "/users/delete", method = RequestMethod.POST)
	public String deleteUser(ModelMap model, @RequestParam("id") int id) {
		userManagerImpl.deleteUser(id);

		return "redirect:/users";
	}

}
