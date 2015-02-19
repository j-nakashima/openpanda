/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/kernel/tags/sakai-10.4/api/src/main/java/org/sakaiproject/entity/api/EntityAccessOverloadException.java $
 * $Id: EntityAccessOverloadException.java 105077 2012-02-24 22:54:29Z ottenhoff@longsight.com $
 ***********************************************************************************
 *
 * Copyright (c) 2005, 2006, 2008 Sakai Foundation
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

package org.sakaiproject.entity.api;

/**
 * <p>
 * EntityAccessOverloadException is thrown whenever there are too many concurrent Entity access requests to process another one at this time.
 * </p>
 */

public class EntityAccessOverloadException extends Exception
{
	private String m_id = null;

	public EntityAccessOverloadException(String id)
	{
		m_id = id;
	}

	public String getId()
	{
		return m_id;
	}

	public String toString()
	{
		return super.toString() + " id=" + m_id;
	}
}
