package ecp.spring.service;

import java.util.List;
import java.util.ArrayList;
import ecp.spring.model.Users;
import ecp.spring.dao.UserDaoImpl;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service("userManagerImpl")
@Transactional(rollbackFor=Exception.class)
public class UserManagerImpl implements UserDetailsService {

	@Autowired
	private UserDaoImpl userDaoImpl;

	public UserDetails loadUserByUsername(String username)
   		throws UsernameNotFoundException {
		UserDetails userDetails = null;
		Users user = userDaoImpl.getUserByUsername(username);
		userDetails = new User(user.getUsername(), 
			user.getPassword(), user.getEnabled(), true, true, true, getAuthorities(user));
		return userDetails;
	}

	public List<GrantedAuthority> getAuthorities(Users user) {
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
   		authList.add(new SimpleGrantedAuthority(user.getRole()));
   		return authList;
   }

	public void addUser(Users user) {
		userDaoImpl.addUser(user);
	}

	public void updateUser(Users user) {
		userDaoImpl.updateUser(user);
	}

	public void deleteUser(int id) {
		userDaoImpl.deleteUser(id);
	}

	@Transactional(readOnly = true)
	public Users getUser(int id) {
		return userDaoImpl.getUser(id);
	}

	@Transactional(readOnly = true)
	public List listUser() {
		return userDaoImpl.listUser();	
	}

}
