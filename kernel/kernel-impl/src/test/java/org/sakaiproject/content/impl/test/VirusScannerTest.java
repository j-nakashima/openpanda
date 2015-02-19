/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/kernel/tags/sakai-10.4/kernel-impl/src/test/java/org/sakaiproject/content/impl/test/VirusScannerTest.java $
 * $Id: VirusScannerTest.java 130227 2013-10-08 11:40:08Z azeckoski@unicon.net $
 ***********************************************************************************
 *
 * Copyright (c) 2007, 2008 Sakai Foundation
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

package org.sakaiproject.content.impl.test;

import junit.extensions.TestSetup;
import junit.framework.Test;
import junit.framework.TestSuite;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.FixMethodOrder;
import org.sakaiproject.content.api.ContentHostingService;
import org.sakaiproject.content.api.ContentResourceEdit;
import org.sakaiproject.content.impl.BaseContentService;
import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.test.SakaiKernelTestBase;
import org.sakaiproject.tool.api.Session;
import org.sakaiproject.tool.api.SessionManager;

import java.io.ByteArrayInputStream;

import static org.junit.runners.MethodSorters.NAME_ASCENDING;

/**
 * Created with IntelliJ IDEA.
 * User: jbush
 * Date: 9/16/13
 * Time: 1:32 PM
 * To change this template use File | Settings | File Templates.
 */
@FixMethodOrder(NAME_ASCENDING)
public class VirusScannerTest extends SakaiKernelTestBase {

    //private static final String SIMPLE_FOLDER1 = "/admin/folder1/";
    private static final Log log = LogFactory.getLog(VirusScannerTest.class);


    public static Test suite()
    {
        TestSetup setup = new TestSetup(new TestSuite(VirusScannerTest.class))
        {
            protected void setUp() throws Exception
            {
                log.debug("starting oneTimeSetup");
                oneTimeSetup("antivirus");
                log.debug("finished oneTimeSetup");
            }
            protected void tearDown() throws Exception
            {
                log.debug("starting tearDown");
                oneTimeTearDown();
                log.debug("finished tearDown");
            }
        };
        return setup;
    }


    /**
     * Checks the resources of zero bytes are handled correctly.
     */
    public void testVirusFound() throws Exception {
        ContentHostingService ch = getService(ContentHostingService.class);
        SessionManager sm = getService(SessionManager.class);
        Session session = sm.getCurrentSession();
        session.setUserEid("admin");
        session.setUserId("admin");
        ContentResourceEdit cr;
        cr = ch.addResource("/fileStream1");
        cr.setContent(new ByteArrayInputStream("test".getBytes()));
        ch.commitResource(cr);


        BaseContentService bchs = (BaseContentService)ch;
        bchs.processVirusQueue();

        try {
            ch.getResource("/fileStream1");
        } catch (IdUnusedException e) {
            assertTrue("file not found, this is expected because a virus was detected", true);
            return;
        }
        assertTrue("the file was found, this is not expected, since a virus was found it should have been removed", false);
    }

}