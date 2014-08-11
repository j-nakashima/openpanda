/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/search/branches/search-1.3.x/search-impl/impl/src/java/org/sakaiproject/search/journal/api/IndexMergeTransaction.java $
 * $Id: IndexMergeTransaction.java 59685 2009-04-03 23:36:24Z arwhyte@umich.edu $
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

package org.sakaiproject.search.journal.api;

import org.sakaiproject.search.transaction.api.IndexTransaction;

/**
 * This transaction represents a merge operation on the local index from the
 * journal store
 * 
 * @author ieb
 */
public interface IndexMergeTransaction extends IndexTransaction
{

	/**
	 * @return
	 */
	long getJournalEntry();

	/**
	 * @param nextJournalEntry
	 */
	void setJournalEntry(long nextJournalEntry);

}
