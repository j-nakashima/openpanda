/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/calendar/branches/sakai-2.8.x/calendar-api/api/src/java/org/sakaiproject/calendar/api/RecurrenceRule.java $
 * $Id: RecurrenceRule.java 59673 2009-04-03 23:02:03Z arwhyte@umich.edu $
 ***********************************************************************************
 *
 * Copyright (c) 2003, 2004, 2005, 2006, 2007, 2008 The Sakai Foundation
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

package org.sakaiproject.calendar.api;

import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.TimeZone;

import org.sakaiproject.time.api.Time;
import org.sakaiproject.time.api.TimeRange;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.ContentHandler;

/**
* <p>RecurrenceRule is the interface for objects which add or remove multiple occurrences of timeranges.</p>
*/
public interface RecurrenceRule
{
	/**
	 * Take values from this xml element
	 * @param el The xml element.
	 */
	void set(Element el);

	/**
	 * Serialize the resource into XML, adding an element to the doc under the top of the stack element.
	 * @param doc The DOM doc to contain the XML (or null for a string return).
	 * @param stack The DOM elements, the top of which is the containing element of the new "resource" element.
	 * @return The newly added element.
	 */
	Element toXml(Document doc, Stack stack);

	/**
	 * Return a List of all RecurrenceInstance objects generated by this rule within the given time range, based on the
	 * prototype first range, in time order.
	 * @param prototype The prototype first TimeRange.
	 * @param range A time range to limit the generated ranges.
	 * @return a List of RecurrenceInstance generated by this rule in this range.
	 */
	List generateInstances(TimeRange prototype, TimeRange range, TimeZone timeZone);

	/**
	 * Remove from the ranges list any RecurrenceInstance excluded by this rule.
	 * @param ranges The list (RecurrenceInstance) of ranges.
	 */
	void excludeInstances(List ranges);


	/**
	 * Return localized short text describing the rule's frequency.
	 * @return A frequency description.
	 */
	String getFrequencyDescription();

	/**
	 * Return string constant describe this rule's frequency
	 * @return A frequency string constant
	 */
	String getFrequency();

	/**
	 * Access the end time for recurring events.
	 * @return The end time for recurring events.
	 */
	Time getUntil();

	/**
	 * Access the number of times that this event should repeat.
	 * @return The number of times that this event should repeat.
	 */
	int getCount();

	/**
	 * Access the number of natural frequency units between repeats.
	 * @return The number of natural frequency units between repeats.
	 */
	int getInterval();
	
	/**
	 * get a content handler to accept SAX events for this object
	 * @return
	 */
	ContentHandler getContentHandler(Map<String, Object> services);
}



