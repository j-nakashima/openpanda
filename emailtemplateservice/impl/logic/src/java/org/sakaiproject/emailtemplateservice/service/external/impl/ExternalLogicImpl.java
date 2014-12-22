/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/emailtemplateservice/tags/sakai-10.3/impl/logic/src/java/org/sakaiproject/emailtemplateservice/service/external/impl/ExternalLogicImpl.java $
 * $Id: ExternalLogicImpl.java 105077 2012-02-24 22:54:29Z ottenhoff@longsight.com $
 ***********************************************************************************
 *
 * Copyright (c) 2003, 2004, 2005, 2006, 2007, 2008 The Sakai Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **********************************************************************************/

package org.sakaiproject.emailtemplateservice.service.external.impl;

import org.sakaiproject.authz.api.SecurityService;
import org.sakaiproject.emailtemplateservice.service.external.ExternalLogic;

public class ExternalLogicImpl implements ExternalLogic {

	private SecurityService securityService;	
	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}


	public boolean isSuperUser() {
		return securityService.isSuperUser();
	}

}
