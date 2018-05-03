package com.user;

import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Database configuration class
 *
 */
@Configuration
@EnableTransactionManagement
@EnableAutoConfiguration
@PropertySource(value = "classpath:application.properties")
public class DatabaseConfiguration {

	@Value(value = "${db.driver}")
	private String dbDriver;

	@Value(value = "${db.password}")
	private String dbPassword;

	@Value(value = "${db.url}")
	private String dbUrl;

	@Value(value = "${db.username}")
	private String dbUserName;

	@Value(value = "${hibernate.dialect}")
	private String hibernateDialect;

	@Value(value = "${hibernate.show_sql}")
	private String hibernateShowSql;

	@Value(value = "${hibernate.hbm2ddl.auto}")
	private String hibernateHbm2ddlAuto;

	@Value(value = "${entitymanager.packagesToScan}")
	private String entityPackageToScan;

	/**
	 * Configure database bean component
	 * @return DataSouce object
	 */
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(this.dbDriver);
		dataSource.setUrl(this.dbUrl);
		dataSource.setUsername(this.dbUserName);
		dataSource.setPassword(this.dbPassword);
		return dataSource;
	}

	/**
	 * Configure session factory bean component
	 * @return LocalSessionFactoryBean object
	 */
	@Bean
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
		sessionFactoryBean.setDataSource(this.dataSource());
		sessionFactoryBean.setPackagesToScan(new String[]{this.entityPackageToScan});
		Properties hibernateProperties = new Properties();
		hibernateProperties.put("hibernate.dialect", this.hibernateDialect);
		hibernateProperties.put("hibernate.show_sql", "true");
		hibernateProperties.put("hibernate.hbm2ddl.auto", this.hibernateHbm2ddlAuto);
		sessionFactoryBean.setHibernateProperties(hibernateProperties);
		return sessionFactoryBean;
	}
}
