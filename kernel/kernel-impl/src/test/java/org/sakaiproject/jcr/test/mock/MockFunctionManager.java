/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/kernel/branches/kernel-1.2.x/kernel-impl/src/test/java/org/sakaiproject/jcr/test/mock/MockFunctionManager.java $
 * $Id: MockFunctionManager.java 79841 2010-07-24 12:49:10Z stephen.marquard@uct.ac.za $
 ***********************************************************************************
 *
 * Copyright (c) 2007, 2008 Sakai Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **********************************************************************************/

package org.sakaiproject.jcr.test.mock;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.authz.api.FunctionManager;

/**
 * @author ieb
 *
 */
public class MockFunctionManager implements FunctionManager
{

	private static final Log log = LogFactory.getLog(MockFunctionManager.class);

	/* (non-Javadoc)
	 * @see org.sakaiproject.authz.api.FunctionManager#getRegisteredFunctions()
	 */
	public List getRegisteredFunctions()
	{
		return new ArrayList();
	}

	/* (non-Javadoc)
	 * @see org.sakaiproject.authz.api.FunctionManager#getRegisteredFunctions(java.lang.String)
	 */
	public List getRegisteredFunctions(String prefix)
	{
		return new ArrayList();
	}

	/* (non-Javadoc)
	 * @see org.sakaiproject.authz.api.FunctionManager#registerFunction(java.lang.String)
	 */
	public void registerFunction(String function)
	{
		log.info("Registering "+function);
	}

	public List<String> getRegisteredUserMutableFunctions() {
		return new ArrayList();
	}

	public List<String> getRegisteredUserMutableFunctions(String prefix) {
		return new ArrayList();
	}

	public void registerFunction(String function, boolean userMutable) {
		log.info("Registering "+function);		
	}

}
