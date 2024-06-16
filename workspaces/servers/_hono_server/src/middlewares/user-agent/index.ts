/**
 *
 * @revision    $Id: index.js 2012-03-24 16:21:10 Aleksey $
 * @created     2012-03-24 16:21:10
 * @category    Express Helpers
 * @package     express-useragent
 * @version     1.0.15
 * @copyright   Copyright (c) 2009-2020 - All rights reserved.
 * @license     MIT License
 * @author      Aleksejs Gordejevs IK <aleksej@gordejev.lv>
 * @link        http://www.gordejev.lv
 *
 */
import usrg from './user-agent';
var UserAgent = usrg.UserAgent;

export const userAgent = function () {
  return function (c, next) {
    var source = c.req.header('user-agent') || '';
    if (c.req.header('x-ucbrowser-ua')) {
      //special case of UC Browser
      source = c.req.header('x-ucbrowser-ua');
    }
    var ua = new UserAgent();
    if (typeof source === 'undefined') {
      source = 'unknown';
    }
    ua.Agent.source = source.replace(/^\s*/, '').replace(/\s*$/, '');
    ua.Agent.os = ua.getOS(ua.Agent.source);
    ua.Agent.platform = ua.getPlatform(ua.Agent.source);
    ua.Agent.browser = ua.getBrowser(ua.Agent.source);
    ua.Agent.version = ua.getBrowserVersion(ua.Agent.source);
    ua.testNginxGeoIP(c.req.raw.headers);
    ua.testBot();
    ua.testMobile();
    ua.testAndroidTablet();
    ua.testTablet();
    ua.testCompatibilityMode();
    ua.testSilk();
    ua.testKindleFire();
    ua.testWechat();
    c.useragent = ua.Agent;
    return next();
  };
};
