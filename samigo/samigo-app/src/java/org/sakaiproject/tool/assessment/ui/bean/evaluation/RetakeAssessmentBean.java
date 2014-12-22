/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/sam/tags/sakai-10.3/samigo-app/src/java/org/sakaiproject/tool/assessment/ui/bean/evaluation/RetakeAssessmentBean.java $
 * $Id: RetakeAssessmentBean.java 106463 2012-04-02 12:20:09Z david.horwitz@uct.ac.za $
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

package org.sakaiproject.tool.assessment.ui.bean.evaluation;

import java.io.Serializable;
import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.sakaiproject.tool.assessment.data.dao.grading.StudentGradingSummaryData;

/**
 * <p>Description: class form for evaluating total scores</p>
 *
 */
public class RetakeAssessmentBean implements Serializable {

	private Long publishedAssessmentId;
	private String agentId;
	private int numberRetake;
	private StudentGradingSummaryData studentGradingSummaryData;
	private String studentName;
	private HashMap studentGradingSummaryDataMap;
	
	private static Log log = LogFactory.getLog(TotalScoresBean.class);

	public RetakeAssessmentBean() {
		log.debug("Creating a new RetakeAssessmentBean");
	}

	public Long getPublishedAssessmentId() {
		return this.publishedAssessmentId;
	}

	public void setPublishedAssessmentId(Long publishedAssessmentId) {
		this.publishedAssessmentId = publishedAssessmentId;
	}

	public String getAgentId() {
		return this.agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public int getNumberRetake() {
		return this.numberRetake;
	}

	public void setNumberRetake(int numberRetake) {
		this.numberRetake = numberRetake;
	}
	
	public StudentGradingSummaryData getStudentGradingSummaryData() {
		return this.studentGradingSummaryData;
	}

	public void setStudentGradingSummaryData(StudentGradingSummaryData studentGradingSummaryData) {
		this.studentGradingSummaryData = studentGradingSummaryData;
	}

	public String getStudentName() {
		return this.studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
		
	public HashMap getStudentGradingSummaryDataMap() {
		return this.studentGradingSummaryDataMap;
	}

	public void setStudentGradingSummaryDataMap(HashMap studentGradingSummaryDataMap) {
		this.studentGradingSummaryDataMap = studentGradingSummaryDataMap;
	}
}
