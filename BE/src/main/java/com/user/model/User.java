package com.user.model;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * User detail entity mapped to user table in database
 *
 */
@Entity
@Table(name = "user")
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Integer id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "city", length = 20)
	private String city;

	@Column(name = "state", length = 20)
	private String state;

	@Column(name = "country", length = 50)
	private String country;

	@Column(name = "company", length = 150)
	private String company;

	@Column(name = "linkdin_url", length = 100)
	private String linkdinUrl;

	@Column(name = "portfolio_url", length = 100)
	private String portfolioUrl;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private Set<UserSkill> userSkills;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(final Integer id) {
		this.id = id;
	}

	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(final String city) {
		this.city = city;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(final String state) {
		this.state = state;
	}

	/**
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * @param country the country to set
	 */
	public void setCountry(final String country) {
		this.country = country;
	}

	/**
	 * @return the company
	 */
	public String getCompany() {
		return company;
	}

	/**
	 * @param company the company to set
	 */
	public void setCompany(final String company) {
		this.company = company;
	}

	/**
	 * @return the linkdinUrl
	 */
	public String getLinkdinUrl() {
		return linkdinUrl;
	}

	/**
	 * @param linkdinUrl the linkdinUrl to set
	 */
	public void setLinkdinUrl(final String linkdinUrl) {
		this.linkdinUrl = linkdinUrl;
	}

	/**
	 * @return the portfolioUrl
	 */
	public String getPortfolioUrl() {
		return portfolioUrl;
	}

	/**
	 * @param portfolioUrl the portfolioUrl to set
	 */
	public void setPortfolioUrl(final String portfolioUrl) {
		this.portfolioUrl = portfolioUrl;
	}

	/**
	 * @return the userSkills
	 */
	public Set<UserSkill> getUserSkills() {
		return userSkills;
	}

	/**
	 * @param userSkills the userSkills to set
	 */
	public void setUserSkills(final Set<UserSkill> userSkills) {
		this.userSkills = userSkills;
	}
}
