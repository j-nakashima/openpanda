/**********************************************************************************
 * $URL: https://source.sakaiproject.org/svn/kernel/branches/kernel-1.2.x/kernel-impl/src/test/java/org/sakaiproject/content/impl/serialize/impl/test/Type1BaseContentCollectionSerializerTest.java $
 * $Id: Type1BaseContentCollectionSerializerTest.java 51317 2008-08-24 04:38:02Z csev@umich.edu $
 ***********************************************************************************
 *
 * Copyright (c) 2003, 2004, 2005, 2006, 2007, 2008 Sakai Foundation
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

package org.sakaiproject.content.impl.serialize.impl.test;

import org.sakaiproject.content.impl.serialize.impl.Type1BaseContentCollectionSerializer;
import org.sakaiproject.content.impl.serialize.impl.Type1BaseContentResourceSerializer;
import org.sakaiproject.entity.api.serialize.EntityParseException;

import junit.framework.TestCase;

/**
 * @author ieb
 *
 */
public class Type1BaseContentCollectionSerializerTest extends TestCase
{

	public Type1BaseContentCollectionSerializerTest(String name)
	{
		super(name);
	}

	/**
	 * @throws java.lang.Exception
	 */
	protected void setUp() throws Exception
	{
	}

	/**
	 * @throws java.lang.Exception
	 */
	protected void tearDown() throws Exception
	{
	}

	/**
	 * Test method for {@link org.sakaiproject.content.impl.serialize.impl.Type1BaseContentCollectionSerializer#parse(org.sakaiproject.entity.api.serialize.SerializableEntity, java.lang.String)}.
	 * @throws Exception 
	 */
	public final void testParse() throws Exception
	{
		Type1BaseContentCollectionSerializer t1 = new Type1BaseContentCollectionSerializer();
		t1.setTimeService(new MockTimeService());
		MockSerializableCollectionAcccess sc = new MockSerializableCollectionAcccess();
		byte[] serialized = t1.serialize(sc);
		t1.parse(sc, serialized);
		sc.check();
	}

	/**
	 * Test method for {@link org.sakaiproject.content.impl.serialize.impl.Type1BaseContentCollectionSerializer#serialize(org.sakaiproject.entity.api.serialize.SerializableEntity)}.
	 * @throws Exception 
	 */
	public final void testSerialize() throws Exception
	{
		Type1BaseContentCollectionSerializer t1 = new Type1BaseContentCollectionSerializer();
		t1.setTimeService(new MockTimeService());
		MockSerializableCollectionAcccess sc = new MockSerializableCollectionAcccess();
		byte[] s = t1.serialize(sc);
		MockSerializableResourceAcccess sr = new MockSerializableResourceAcccess();
		try {
			byte[] s1 = t1.serialize(sr);
			fail("Should have refused to serialize a ResourceAccess Object ");
		} catch ( EntityParseException epe ) {
			
		}
	}

	/**
	 * Test method for {@link org.sakaiproject.content.impl.serialize.impl.Type1BaseContentCollectionSerializer#accept(java.lang.String)}.
	 */
	public final void testAccept()
	{
		Type1BaseContentCollectionSerializer t1 = new Type1BaseContentCollectionSerializer();
		
		assertEquals(true,t1.accept((Type1BaseContentCollectionSerializer.BLOB_ID+"the rest of the  blob").getBytes()));
		assertEquals(false,t1.accept((Type1BaseContentResourceSerializer.BLOB_ID+"the rest of the  blob").getBytes()));
		assertEquals(false,t1.accept(("0"+Type1BaseContentCollectionSerializer.BLOB_ID+"the rest of the  blob").getBytes()));
		assertEquals(false,t1.accept(null));
		assertEquals(false,t1.accept(("0somethisdfjsdkjfs dfjsldkf").getBytes()));
	}

}
