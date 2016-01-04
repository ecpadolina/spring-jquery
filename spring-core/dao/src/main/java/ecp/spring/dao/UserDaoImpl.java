package ecp.spring.dao;

import java.util.List;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import ecp.spring.model.Users;
import ecp.spring.model.Person;

@Repository("userDaoImpl")
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	public void addUser(Users user) {
		sessionFactory.getCurrentSession().save(user);
	}

	public void updateUser(Users user) {
		sessionFactory.getCurrentSession().update(user);
	}

	public void deleteUser(int id) {
		sessionFactory.getCurrentSession().delete(getUser(id));	
	}

	public Users getUser(int id) {
		return (Users)sessionFactory.getCurrentSession().get(Users.class, id);
	}

	public List listUser() {
		return sessionFactory.getCurrentSession().createCriteria(Users.class).list();
	}

	public Users getUserByUsername(String username) {
		List<Users> list = listUser();
		for(Users user : list) {
			if(user.getUsername().equals(username)){
				return user;
			}
		}

		return null;
	}

}
