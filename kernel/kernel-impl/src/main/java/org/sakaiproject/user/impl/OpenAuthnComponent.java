/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/kernel/branches/kernel-1.2.x/kernel-impl/src/main/java/org/sakaiproject/user/impl/OpenAuthnComponent.java $
 * $Id: OpenAuthnComponent.java 51317 2008-08-24 04:38:02Z csev@umich.edu $
 ***********************************************************************************
 *
 * Copyright (c) 2005, 2006, 2008 Sakai Foundation
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

package org.sakaiproject.user.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.user.api.Authentication;
import org.sakaiproject.user.api.AuthenticationException;
import org.sakaiproject.user.api.AuthenticationManager;
import org.sakaiproject.user.api.AuthenticationUnknownException;
import org.sakaiproject.user.api.Evidence;
import org.sakaiproject.user.api.ExternalTrustedEvidence;
import org.sakaiproject.user.api.IdPwEvidence;

/**
 * <p>
 * A placeholder wide open Authentication - returns the password as the authentication user (UUID) id.
 * </p>
 */
public class OpenAuthnComponent implements AuthenticationManager
{
	/** Our log (commons). */
	private static Log M_log = LogFactory.getLog(OpenAuthnComponent.class);

	/**********************************************************************************************************************************************************************************************************************************************************
	 * Dependencies and their setter methods
	 *********************************************************************************************************************************************************************************************************************************************************/

	/**********************************************************************************************************************************************************************************************************************************************************
	 * Init and Destroy
	 *********************************************************************************************************************************************************************************************************************************************************/

	/**
	 * Final initialization, once all dependencies are set.
	 */
	public void init()
	{
		M_log.info("init()");
	}

	/**
	 * Final cleanup.
	 */
	public void destroy()
	{
		M_log.info("destroy()");
	}

	/**********************************************************************************************************************************************************************************************************************************************************
	 * Work interface methods: AuthenticationManager
	 *********************************************************************************************************************************************************************************************************************************************************/

	/**
	 * @inheritDoc
	 */
	public Authentication authenticate(Evidence e) throws AuthenticationException
	{
		if (e instanceof IdPwEvidence)
		{
			IdPwEvidence evidence = (IdPwEvidence) e;

			// reject null or blank
			if ((evidence.getPassword() == null) || (evidence.getPassword().trim().length() == 0)
					|| (evidence.getIdentifier() == null) || (evidence.getIdentifier().trim().length() == 0))
			{
				throw new AuthenticationException("invalid login");
			}

			// we always pass the authentication

			// use the password as the uid, the name as the eid
			Authentication rv = new org.sakaiproject.util.Authentication(evidence.getPassword(), evidence.getIdentifier());
			return rv;
		}
		else if (e instanceof ExternalTrustedEvidence)
		{
			ExternalTrustedEvidence evidence = (ExternalTrustedEvidence) e;

			// reject null or blank
			if ((evidence.getIdentifier() == null) || (evidence.getIdentifier().trim().length() == 0))
			{
				throw new AuthenticationException("invalid login");
			}

			// accept, but we need to lookup the user in our database to get a uuid.

			Authentication rv = new org.sakaiproject.util.Authentication("000-00-0000", evidence.getIdentifier());
			return rv;
		}
		else
		{
			throw new AuthenticationUnknownException(e.toString());
		}
	}
}
