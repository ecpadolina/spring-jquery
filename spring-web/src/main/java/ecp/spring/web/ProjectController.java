package ecp.spring.web;

import ecp.spring.model.Project;
import ecp.spring.model.Tickets;
import ecp.spring.model.Person;
import ecp.spring.model.ProjectDTO;
import ecp.spring.service.PersonManagerImpl;
import ecp.spring.service.ProjectManagerImpl;
import ecp.spring.service.ProjectTransformer;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.ui.ModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



@Controller
public class ProjectController {

    @Autowired
    private ProjectManagerImpl projectManagerImpl;

    @Autowired
    private PersonManagerImpl personManagerImpl;

    @Autowired
    private ProjectValidator projectValidator;

    @Autowired
    private ProjectTransformer projectTransformer;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }

    @RequestMapping("/project")
    public String projectIndex(Model model) {
        model.addAttribute("projectList", projectManagerImpl.listProjects());
        return "projectIndex";
    }

    @RequestMapping(value = "/project/add", method = RequestMethod.GET)
    public String addProjectGet(ModelMap model) {
        model.addAttribute("project", new ProjectDTO());
        model.addAttribute("persons", personManagerImpl.listPerson(0, 1, "id"));
        return "projectForm";
    }

    @RequestMapping(value = "/project/add", method = RequestMethod.POST)
    public String addProjectPost(ModelMap model, @ModelAttribute(value = "project") ProjectDTO project, BindingResult result,
                                 @RequestParam(value = "members", required = false) String[] personIds) {
        projectValidator.validate(project, result);
        if (result.hasErrors()) {
            model.addAttribute("persons", personManagerImpl.listPerson(0, 1, "id"));
            return "projectForm";
        }

        Set<Person> members = new HashSet<Person>();
        if (personIds != null) {
            for (String id : personIds) {
                members.add(personManagerImpl.getPerson(Integer.parseInt(id)));
            }
            project.setPersons(members);
        }

        projectManagerImpl.addProject(project);
        return "redirect:/project";
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public String deleteProject(@RequestParam(value = "projectId") int id) {
        projectManagerImpl.deleteProject(id);
        return "redirect:/project";
    }

    @RequestMapping(value = "/project/edit/{id}", method = RequestMethod.GET)
    public String editProjectGet(ModelMap model, @PathVariable(value = "id") int id) {
        Project project = projectManagerImpl.getProject(id);
        model.addAttribute("persons", personManagerImpl.listPerson(0, 1, "id"));
        model.addAttribute("id", id);
        model.addAttribute("project", project);
        return "projectForm";
    }

    @RequestMapping(value = "/project/edit/{id}", method = RequestMethod.POST)
    public String editProjectPost(ModelMap model, @ModelAttribute(value = "project") Project project, 
                                  BindingResult result,
                                  @RequestParam(value = "members", required = false) String[] personIds) {
        Set<Person> members = new HashSet<Person>();
        if (personIds != null) {
            for (String id : personIds) {
                members.add(personManagerImpl.getPerson(Integer.parseInt(id)));
            }
            project.setPersons(members);
        }
        project.setTickets(getProjectTickets(project.getId()));
        projectValidator.validate(project, result);
        if (result.hasErrors()) {
            model.addAttribute("persons", personManagerImpl.listPerson(0, 1, "id"));
            return "projectForm";
        }
        projectManagerImpl.updateProject(project);
        return "redirect:/project";
    }

    @RequestMapping(value = "/project/edit/{id}/addTicket", method = RequestMethod.GET)
    public String addTicketGet(ModelMap model, @PathVariable(value = "id") int id){
        Tickets ticket = new Tickets();
        Project project = projectManagerImpl.getProject(id);
        model.addAttribute("ticket", ticket);
        model.addAttribute("persons", project.getPersons());
        return "ticketForm";
    }

    @RequestMapping(value = "/project/edit/{id}/addTicket", method = RequestMethod.POST)
    public String addTicketPOST(ModelMap model, @PathVariable(value = "id") int id,
                                @ModelAttribute(value = "ticket") Tickets ticket,
                                BindingResult result,
                                @RequestParam(value ="persons", required = true) Integer personId){
        Project project = projectManagerImpl.getProject(id);
        Set<Tickets> tickets = project.getTickets();
        if(personId != null){
            ticket.setPerson(personManagerImpl.getPerson(personId));
        }
        tickets.add(ticket);
        project.setTickets(tickets);
        projectManagerImpl.updateProject(project);
        return "redirect:/project/edit/" + id;
    }

    @RequestMapping(value ="/project/edit/{id}/editTicket/{tId}", method = RequestMethod.GET)
    public String editTicketGET(ModelMap model, @PathVariable(value = "tId") int ticketId,
                                @PathVariable(value = "id") int projectId){
        Project project = projectManagerImpl.getProject(projectId);
        Tickets ticketToEdit = null;
        for(Tickets ticket : project.getTickets()){
            if(ticketId == ticket.getId()){
                ticketToEdit = ticket;
            }
        }
        model.addAttribute("ticket", ticketToEdit);
        model.addAttribute("persons", project.getPersons());
        return "ticketForm";
    }

    @RequestMapping(value ="/project/edit/{id}/editTicket/{tId}", method = RequestMethod.POST)
    public String editTicketPOST(ModelMap moel, @ModelAttribute(value = "ticket") Tickets ticket,
                                 BindingResult result,
                                 @PathVariable(value = "id") int projectId,
                                 @RequestParam(value = "persons", required = true) Integer personId){
        Project project = projectManagerImpl.getProject(projectId);
        Set<Tickets> tickets = project.getTickets();
        for(Tickets tempTicket : tickets){
            if(tempTicket.getId() == ticket.getId()){
                tempTicket.setTicketDetails(ticket.getTicketDetails());
                tempTicket.setTicketStatus(ticket.getTicketStatus());
                tempTicket.setPerson(personManagerImpl.getPerson(personId));
            }
            project.setTickets(tickets);
            projectManagerImpl.updateProject(project);
        }
        return "redirect:/project/edit/" + projectId;
    }

    public Set<Tickets> getProjectTickets(int id){
        return projectManagerImpl.getProject(id).getTickets();
    }
}