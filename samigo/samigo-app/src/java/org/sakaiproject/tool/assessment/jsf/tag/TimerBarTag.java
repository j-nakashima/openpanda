/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/sam/tags/sakai-10.4/samigo-app/src/java/org/sakaiproject/tool/assessment/jsf/tag/TimerBarTag.java $
 * $Id: TimerBarTag.java 271441 2014-02-13 19:31:48Z ktsao@stanford.edu $
 ***********************************************************************************
 *
 * Copyright (c) 2004, 2005, 2006, 2007, 2008 The Sakai Foundation
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





package org.sakaiproject.tool.assessment.jsf.tag;

import javax.faces.component.UIComponent;
import javax.faces.webapp.UIComponentTag;

/**
 * <p> </p>
 * <p>Description:<br />
 * This class is the tag handler that evaluates the <code>timerBar</code>
 * custom tag.</p>
 * <p>Copyright: Copyright (c) 2004</p>
 * <p>Organization: Sakai Project</p>
 * @author Ed Smiley
 * @version $Id: TimerBarTag.java 271441 2014-02-13 19:31:48Z ktsao@stanford.edu $
 */

public class TimerBarTag
  extends UIComponentTag
{

  private String id = null;
  private String expireScript;
  private String expireScript2;

  //private TagUtil util;
  private String elapsed;
  private String height;
  private String wait;
  private String width;


  public void setHeight(String height)
  {
    this.height = height;
  }

  public String getHeight()
  {
    return height;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public String getId()
  {
    return id;
  }

  public String getComponentType()
  {
    return ("javax.faces.Output");
  }

  public String getRendererType()
  {
    return "TimerBar";
  }

  protected void setProperties(UIComponent component)
  {
    super.setProperties(component);

    //FacesContext context = getFacesContext();
    TagUtil.setInteger(component, "height", height);
    TagUtil.setInteger(component, "width", width);
    TagUtil.setInteger(component, "wait", wait);
    TagUtil.setInteger(component, "elapsed", elapsed);
    TagUtil.setString(component, "expireScript", expireScript);
  }
  public String getWidth()
  {
    return width;
  }
  public void setWidth(String width)
  {
    this.width = width;
  }
  public String getWait()
  {
    return wait;
  }
  public void setWait(String wait)
  {
    this.wait = wait;
  }
  public String getElapsed()
  {
    return elapsed;
  }
  public void setElapsed(String elapsed)
  {
    this.elapsed = elapsed;
  }
  public String getExpireScript()
  {
    return expireScript;
  }
  public void setExpireScript(String expireScript)
  {
    this.expireScript = expireScript;
  }
  
}
