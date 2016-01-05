package ecp.spring.dao;

import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.SessionFactory;
import ecp.spring.model.Project;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

@Repository("projectDao")
public class ProjectDaoImpl implements ProjectDao {
	
	@Autowired
	private SessionFactory sessionFactory;
    
	public List listProjects() {
		List list = sessionFactory.getCurrentSession().createCriteria(Project.class)
					.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
		return list;
	}

	public List listProjects(int order, String column){
		Criteria crit = sessionFactory.getCurrentSession().createCriteria(Project.class);
		if(order == 1){
			crit.addOrder(Order.asc(column));
		} else {
			crit.addOrder(Order.desc(column));
		}

		return crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
	}

	public Project getProject(int id) {
		return (Project)sessionFactory.getCurrentSession().get(Project.class, id);
	}

	public void addProject(Project project) {
		sessionFactory.getCurrentSession().save(project);
	}

	public void deleteProject(int id) {
		sessionFactory.getCurrentSession().delete(getProject(id));
	}

    public void updateProject(Project project) {
		sessionFactory.getCurrentSession().update(project);
    }

}
