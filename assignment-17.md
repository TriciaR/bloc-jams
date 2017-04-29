We've learned more about jQuery and how great it is. It simplifies many tasks and substantially reduces the amount of code we have to write.

**If jQuery's so great, then why would anyone ever use DOM scripting?**

Research the answer to this question, starting with these resources: 
 - [1]: https://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/m _Sitepoint: Native JavaScript Equivalents of jQuery Methods_
- [2]: https://gomakethings.com/ditching-jquery-for-vanilla-js/ _Go Make Things: Ditching jQuery for Vanilla JS_
- [3] _DEFINITION: latency_ http://whatis.techtarget.com/definition/latency
- [4] Niraj Bhatt – Architect's BlogRuminations on .NET, Architecture & Design, _Performance Testing – Response vs. Latency vs. Throughput vs. Load vs. Scalability vs. Stress vs. Robustness_ https://nirajrules.wordpress.com/2009/09/17/measuring-performance-response-vs-latency-vs-throughput-vs-load-vs-scalability-vs-stress-vs-robustness/
- [5] http://youmightnotneedjquery.com/ _YOU MIGHT NOT NEED JQUERY_
- [6] https://blog.udemy.com/jquery-vs-javascript/ 
_JQuery vs. JavaScript: What’s the Difference Anyway?_
- [7] http://www.jscripters.com/jquery-disadvantages-and-advantages/ _JQUERY: ADVANTAGES AND DISADVANTAGES_
- [8] https://www.webdesignerdepot.com/2012/09/jquery-the-good-the-bad-and-the-ugly/ _JQuery: the Good, the Bad & the Ugly_

_Answer the question in at least one paragraph in your own words. Cite two or more reputable references to support your reasoning. SEE ANSWER BELOW_


Here are some of the advantages of pure, native JavaScript over the use of jQuery in writing code that I have found useful & informative:

 - SPEED/PERFORMANCE: native JS is significantly faster - less code being loaded, faster load times for page 
     - Native JS was up to 60x faster  - also illustrates that fetching nodes by ID, tag or class will normally be preferable to querySelectorAll.[1]
     - while jQuery smooths out all of the various browser inconsistencies you can run into, all that abstraction and extra code adds a lot of weight and performance latency to a site. [2]
        - NOTE: Latency is the delay from input into a system to desired outcome; the term is understood slightly differently in various contexts and latency issues also vary from one system to another. Latency greatly affects how usable and enjoyable electronic and mechanical devices as well as communications are. [3]
 - SIZE/DATA: You are unlikely to require all the functionality it provides and, even if you omit certain modules, it remains a sizable quantity of code. You may load the 30Kb minified version from a CDN but the browser must halt processing and parse the code on every page before doing anything else. [1]
    -  JQuery javascript file required - The JQuery javascript file is required to run JQuery commands, while the size of this file is relatively small (25-100KB depending on server), it is still a strain on the client computer and maybe your web server as well if you intend to host the JQuery script on your own web server.[7]
 - LEARNING & UNDERSTANDING PURE JS:  it’s important to realize how JavaScript works and how it affects the Document Object Model (DOM) -  writing pure JS over using jQuery libraries allows a better understanding of the JS language itself - as a novice web developer you should still take the time to learn both JavaScript and jQuery [6]
 - OPEN-SOURCED & BAD CODE: because libraris are open-sourced, there is a greater risk of 'bad code' problems [8]
 - Functionality maybe limited - While JQuery has an impressive library in terms of quantity, depending on how much customization you require on your website, functionality maybe limited thus using raw javascript maybe inevitable in some cases.[7]




