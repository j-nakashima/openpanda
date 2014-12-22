/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/edu-services/tags/sakai-10.3/cm-service/cm-impl/hibernate-impl/hibernate/src/java/org/sakaiproject/coursemanagement/impl/AbstractNamedCourseManagementObjectCmImpl.java $
 * $Id: AbstractNamedCourseManagementObjectCmImpl.java 105077 2012-02-24 22:54:29Z ottenhoff@longsight.com $
 ***********************************************************************************
 *
 * Copyright (c) 2006, 2008 The Sakai Foundation
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

package org.sakaiproject.coursemanagement.impl;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;


public abstract class AbstractNamedCourseManagementObjectCmImpl
	extends AbstractPersistentCourseManagementObjectCmImpl  implements Serializable {
	
	protected String title;
	protected String description;
	protected String eid;
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getEid() {
		return eid;
	}
	public void setEid(String eid) {
		this.eid = eid;
	}	

	public String toString() {
		return new ToStringBuilder(this)
			.append(getEid())
			.append(getTitle())
			.append(getDescription())
			.toString();
	}
}
