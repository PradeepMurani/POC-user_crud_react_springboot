package com.user.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.user.common.Constant;
import com.user.common.Response;
import com.user.model.User;
import com.user.service.UserSerivce;

/**
 * User CRUD operation controller class
 *
 */
@CrossOrigin(maxAge = Constant.CROSS_ORGIN_MAX_AGE)
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserSerivce userService;

	/**
	 * Save or update user detail
	 * @param userInfo User information to save
	 * @return Standard response object
	 */
	@RequestMapping(value = "/saveOrUpdate", method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response saveOrUpdateUser(@RequestBody final User userInfo) {
		return userService.saveOrUpdateUser(userInfo);
	}

	/**
	 * Delete user detail
	 * @param id User id to delete user detail
	 * @return Standard response object
	 */
	@RequestMapping(value = "/deleteUser/{id}", method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Response deleteUser(@PathVariable("id") final Integer id) {
		return userService.deleteUser(id);
	}

	/**
	 * Fetch all user details
	 * @return List of user details
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public List<User> fetchUserList() {
		return userService.fetchUserList();
	}
}
