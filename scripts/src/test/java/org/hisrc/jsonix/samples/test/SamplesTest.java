package org.hisrc.jsonix.samples.test;

import net.disy.legato.testing.script.AbstractJsUnitScriptTest;

import com.gargoylesoftware.htmlunit.BrowserVersion;

public class SamplesTest extends AbstractJsUnitScriptTest {

	@Override
	public BrowserVersion getBrowserVersion() {
		return BrowserVersion.FIREFOX_3;
	}

}
