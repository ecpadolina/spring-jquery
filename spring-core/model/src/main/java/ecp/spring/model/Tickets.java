package ecp.spring.model;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "tickets")
public class Tickets{

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "ticket_details")
	private String ticketDetails;

	@Column(name = "ticket_status")
	private String ticketStatus;

	@OneToOne
	@JoinTable(name = "ticket_person", joinColumns = @JoinColumn(name = "ticket_id"),
			   inverseJoinColumns = @JoinColumn(name="person_id"))
	private Person person;

	public Tickets(){}

	public int getId(){
		return this.id;
	}

	public String getTicketDetails(){
		return this.ticketDetails;
	}

	public String getTicketStatus(){
		return this.ticketStatus;
	}

	public Person getPerson(){
		return this.person;
	}

	public void setId(int id){
		this.id = id;
	}

	public void setTicketDetails(String ticketDetails){
		this.ticketDetails = ticketDetails;
	}

	public void setTicketStatus(String ticketStatus){
		this.ticketStatus = ticketStatus;
	}

	public void setPerson(Person person){
		this.person = person;
	}

}