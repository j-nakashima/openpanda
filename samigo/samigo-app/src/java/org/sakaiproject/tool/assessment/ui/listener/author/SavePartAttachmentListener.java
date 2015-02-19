/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/sam/tags/sakai-10.4/samigo-app/src/java/org/sakaiproject/tool/assessment/ui/listener/author/SavePartAttachmentListener.java $
 * $Id: SavePartAttachmentListener.java 106463 2012-04-02 12:20:09Z david.horwitz@uct.ac.za $
 ***********************************************************************************
 *
 * Copyright (c) 2004, 2005, 2006, 2008 The Sakai Foundation
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



package org.sakaiproject.tool.assessment.ui.listener.author;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.faces.event.AbortProcessingException;
import javax.faces.event.ActionEvent;
import javax.faces.event.ActionListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.tool.assessment.data.ifc.assessment.AssessmentIfc;
import org.sakaiproject.tool.assessment.data.ifc.assessment.SectionAttachmentIfc;
import org.sakaiproject.tool.assessment.data.ifc.assessment.SectionDataIfc;
import org.sakaiproject.tool.assessment.services.assessment.AssessmentService;
import org.sakaiproject.tool.assessment.services.assessment.PublishedAssessmentService;
import org.sakaiproject.tool.assessment.ui.bean.author.AssessmentSettingsBean;
import org.sakaiproject.tool.assessment.ui.bean.author.PublishedAssessmentSettingsBean;
import org.sakaiproject.tool.assessment.ui.bean.author.SectionBean;
import org.sakaiproject.tool.assessment.ui.listener.util.ContextUtil;

import org.sakaiproject.content.api.FilePickerHelper;
import org.sakaiproject.tool.cover.SessionManager;
import org.sakaiproject.tool.api.ToolSession;
import org.sakaiproject.entity.api.Reference;

/**
 * <p>Title: Samigo</p>
 * <p>Description: Sakai Assessment Manager</p>
 * @version $Id: SavePartAttachmentListener.java 106463 2012-04-02 12:20:09Z david.horwitz@uct.ac.za $
 */

public class SavePartAttachmentListener
    implements ActionListener
{
  private static Log log = LogFactory.getLog(SavePartAttachmentListener.class);
  //this is to indicate which flow
  // if it is true, that means we save the section attachment in setting page of a pending assessment (authorSettings.jsp)
  // if it is false, that means we save the section attachment in setting page of a published assessment (publishedSettings.jsp)
  private boolean isForAuthorSettings;
  
  public SavePartAttachmentListener()
  {
  }

  public SavePartAttachmentListener(boolean isForAuthorSettings)
  {
	  this.isForAuthorSettings = isForAuthorSettings;
  }
  
  public void processAction(ActionEvent ae) throws AbortProcessingException {
    SectionBean sectionBean = (SectionBean) ContextUtil.lookupBean("sectionBean");
    AssessmentService assessmentService = null;
	AssessmentIfc assessment = null;
	if (isForAuthorSettings) {
		assessmentService = new AssessmentService();
	}
	else {
		assessmentService = new PublishedAssessmentService();
	}  
	List attachmentList = prepareSectionAttachment(sectionBean, assessmentService);
    sectionBean.setAttachmentList(attachmentList);
    if (attachmentList != null && attachmentList.size() >0){
      sectionBean.setHasAttachment(true);
    }
    else{
      sectionBean.setHasAttachment(false);
    }
  }

  private HashMap getResourceIdHash(Set attachmentSet){
    HashMap map = new HashMap();
    if (attachmentSet !=null ){
      Iterator iter = attachmentSet.iterator();
      while (iter.hasNext()){
        SectionAttachmentIfc attach = (SectionAttachmentIfc) iter.next();
        map.put(attach.getResourceId(), attach);
      }
    }
    return map;
  }

  private List prepareSectionAttachment(SectionBean sectionBean, AssessmentService assessmentService){
    SectionDataIfc section = null;
    // section == null => section does not exist yet
    if (sectionBean.getSection() != null){
      section = sectionBean.getSection().getData();
    }

    ToolSession session = SessionManager.getCurrentToolSession();
    if (session.getAttribute(FilePickerHelper.FILE_PICKER_ATTACHMENTS) != null) {
      
      Set attachmentSet = new HashSet();
      if (section!=null){
        attachmentSet = section.getSectionAttachmentSet();
      } 
      HashMap map = getResourceIdHash(attachmentSet);
      ArrayList newAttachmentList = new ArrayList();

      String protocol = ContextUtil.getProtocol();

      List refs = (List)session.getAttribute(FilePickerHelper.FILE_PICKER_ATTACHMENTS);
      if (refs!=null && refs.size() > 0){
        Reference ref;
        for(int i=0; i<refs.size(); i++) {
          ref = (Reference) refs.get(i);
          String resourceId = ref.getId();
          if (map.get(resourceId) == null){
            // new attachment, add 
            log.debug("**** ref.Id="+ref.getId());
            log.debug("**** ref.name="+ref.getProperties().getProperty(
                       ref.getProperties().getNamePropDisplayName()));
            SectionAttachmentIfc newAttach = assessmentService.createSectionAttachment(
                                          section,
                                          ref.getId(), ref.getProperties().getProperty(
                                                       ref.getProperties().getNamePropDisplayName()),
                                        protocol);
            newAttachmentList.add(newAttach);
	  }
          else{ 
            // attachment already exist, let's add it to new list and
	    // check it off from map
            newAttachmentList.add((SectionAttachmentIfc)map.get(resourceId));
            map.remove(resourceId);
	  }
        }
      }

      session.removeAttribute(FilePickerHelper.FILE_PICKER_ATTACHMENTS);
      session.removeAttribute(FilePickerHelper.FILE_PICKER_CANCEL);
      return newAttachmentList;
    }
    return new ArrayList(); 
  }
 }

