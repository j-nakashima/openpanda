/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/help/branches/sakai-2.8.x/help-component-shared/src/java/org/sakaiproject/component/app/help/model/HelpRegistration.java $
 * $Id: HelpRegistration.java 59674 2009-04-03 23:05:58Z arwhyte@umich.edu $
 ***********************************************************************************
 *
 * Copyright (c) 2003, 2004, 2005, 2006, 2008 The Sakai Foundation
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

package org.sakaiproject.component.app.help.model;

import java.util.List;

/**
 * help registration
 * @version $Id: HelpRegistration.java 59674 2009-04-03 23:05:58Z arwhyte@umich.edu $
 */
public class HelpRegistration
{
  private List registrationFiles;

  /**
   * get registration files
   * @return Returns the registrationFiles.
   */
  public List getRegistrationFiles()
  {
    return registrationFiles;
  }

  /**
   * set registration files
   * @param registrationFiles The registrationFiles to set.
   */
  public void setRegistrationFiles(List registrationFiles)
  {
    this.registrationFiles = registrationFiles;
  }
}


