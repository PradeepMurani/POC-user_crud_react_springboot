package com.user.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.user.common.Constant;
import com.user.common.Response;
import com.user.dao.UserDao;
import com.user.model.User;

/**
 * Service for User CRUD operation
 *
 */
@Service
public class UserSerivce {

	@Autowired
	private UserDao userDao;

	/**
	 * Save or Update user information service layer method
	 * @param user User entity object
	 * @return Standard response object
	 */
	public Response saveOrUpdateUser(final User user) {
		boolean isSaveRequest = user.getId() == null ? true : false;
		userDao.save(user);
		Response response = new Response();
		response.setStatus(Constant.STATUS_OK);
		response.setResponseCode(Constant.RESPONSE_CODE_OK);
		response.setMessage(isSaveRequest ? Constant.USER_SAVE_SUCCESS_MSG : Constant.USER_UPDATE_SUCCESS_MSG);
		return response;
	}

	/**
	 * Delete user information service layer method
	 * @param id User id to delete specific user detail
	 * @return Standard response object
	 */
	public Response deleteUser(final Integer id) {
		userDao.delete(id);
		Response response = new Response();
		response.setStatus(Constant.STATUS_OK);
		response.setResponseCode(Constant.RESPONSE_CODE_OK);
		response.setMessage(Constant.USER_DELETE_SUCCESS_MSG);
		return response;
	}

	/**
	 * Fetching list of user service layer method
	 * @return Fetch all user details
	 */
	public List<User> fetchUserList() {
		List<User> userList = new ArrayList<>();
		Iterable<User> iter =  userDao.findAll();
		iter.forEach((user) -> userList.add(user));
		return userList;
	}
}
