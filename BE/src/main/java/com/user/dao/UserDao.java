package com.user.dao;

import javax.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.user.model.User;

/**
 * User DAO layer
 *
 */
@Repository
@Transactional
public interface UserDao extends CrudRepository<User, Integer> {

}
