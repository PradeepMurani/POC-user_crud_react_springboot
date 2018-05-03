package com.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * User skills entity mapped to user_skill table in database
 *
 */
@Entity
@Table(name = "user_skill")
public class UserSkill {

	@Id
	@Column(name = "id")
	@GeneratedValue
	private Integer id;

	@Column(name = "skill_name", length = 30)
	private String skillName;

	@Column(name = "experience", length = 3)
	private Integer experience;

	@Column(name = "sample_code_url", length = 100)
	private String sampleCodeUrl;

	@Column(name = "git_repository_url", length = 100)
	private String gitRepositoryUrl;

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
	 * @return the skillName
	 */
	public String getSkillName() {
		return skillName;
	}

	/**
	 * @param skillName the skillName to set
	 */
	public void setSkillName(final String skillName) {
		this.skillName = skillName;
	}

	/**
	 * @return the experience
	 */
	public Integer getExperience() {
		return experience;
	}

	/**
	 * @param experience the experience to set
	 */
	public void setExperience(final Integer experience) {
		this.experience = experience;
	}

	/**
	 * @return the sampleCodeUrl
	 */
	public String getSampleCodeUrl() {
		return sampleCodeUrl;
	}

	/**
	 * @param sampleCodeUrl the sampleCodeUrl to set
	 */
	public void setSampleCodeUrl(final String sampleCodeUrl) {
		this.sampleCodeUrl = sampleCodeUrl;
	}

	/**
	 * @return the gitRepositoryUrl
	 */
	public String getGitRepositoryUrl() {
		return gitRepositoryUrl;
	}

	/**
	 * @param gitRepositoryUrl the gitRepositoryUrl to set
	 */
	public void setGitRepositoryUrl(final String gitRepositoryUrl) {
		this.gitRepositoryUrl = gitRepositoryUrl;
	}
}
