package ecp.spring.service;

import java.util.List;
import ecp.spring.model.Users;

public interface UserManager {


	public void addUser(Users user);

	public void updateUser(Users user);

	public void deleteUser(int id);

	public Users getUser(int id);

	public List listUser();

}
