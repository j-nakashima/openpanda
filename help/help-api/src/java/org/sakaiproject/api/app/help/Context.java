/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/help/branches/sakai-2.8.x/help-api/src/java/org/sakaiproject/api/app/help/Context.java $
 * $Id: Context.java 59674 2009-04-03 23:05:58Z arwhyte@umich.edu $
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

package org.sakaiproject.api.app.help;

/**
 * Context name.
 * @version $Id: Context.java 59674 2009-04-03 23:05:58Z arwhyte@umich.edu $
 * 
 */
public interface Context
{
  /**
   * get name
   * @return name
   */
  public String getName();

  /**
   * set name
   * @param name
   */
  public void setName(String name);
}


