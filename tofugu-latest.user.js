// ==UserScript==
// @name         Tofugu Latest
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Wanikani dashboard extension to display latest 3 articles on tofugu.com
// @author       Rex Walters (Rrwrex)
// @include      /^https:\/\/(www|preview).wanikani.com\/(dashboard)?$/
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const numberOfArticles = 3;

  const tlCSS = `
    .tofugu-latest {
      display: flex;
      font-family: "Ubuntu", Helvetica, Arial, sans-serif;
      font-size: 14px;
      background-color: #d5d5d5;
      border-radius: 5px;
      padding: 5px;
    }
    .tofugu-latest img {
      height: 40px;
      padding: 0 20px;
      align-self: center;
    }
    .tofugu-latest table {
      padding-left: 1rem;
      width: 100%;
    }
    .tofugu-article a {
      display: block;
      text-decoration: none;
      text-align: left;
      color: #222222;
    }
    .tofugu-article a:visited {
      color: #999;
    }
    .tofugu-article a:hover {
      color: #e50036;
    }
    td.tofugu-age {
      color: #999;
      text-align: left;
      padding-left: 1rem;
    }
  `;

  // Append our CSS
  const tlStyle = document.createElement("style");
  tlStyle.id = "tofuguLatest";
  tlStyle.innerHTML = tlCSS;
  document.querySelector("head").append(tlStyle);

  const rawFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Tofugu</title>
  <subtitle>A Japanese Culture &amp; Language Blog</subtitle>
  <id>https://www.tofugu.com/</id>
  <link href="https://www.tofugu.com/"/>
  <link href="https://www.tofugu.com/feed.xml" rel="self"/>
  <updated>2021-09-07T00:00:00Z</updated>
  <author>
    <name>Tofugu</name>
  </author>
  <entry>
    <title>Futokoro — A Deep Pocket Full of Unique Expressions</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/futokoro/"/>
    <id>https://www.tofugu.com/japanese/futokoro/</id>
    <published>2021-09-07T00:00:00Z</published>
    <author>
      <name>Mami Suzuki</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-09-07-futokoro/header-1280x.jpg" /&gt; 懐（ふところ） (futokoro) is a pocket that&amp;#39;s situated between the inner and outer layers of a kimono — the traditional Japanese garment that&amp;#39;s a long, loose robe with wide sleeves. When wearing a kimono, the left side is wrapped over the right and tied with...</summary>
  </entry>
  <entry>
    <title>あける, あく, ひらける, and ひらく: Differences Between Four Different "OPEN"s in Japanese</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/akeru-aku-hirakeru-hiraku/"/>
    <id>https://www.tofugu.com/japanese/akeru-aku-hirakeru-hiraku/</id>
    <published>2021-08-24T00:00:00Z</published>
    <author>
      <name>Mami Suzuki</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-08-24-akeru-aku-hirakeru-hiraku/header-1280x.jpg" /&gt;How do you say &amp;quot;open&amp;quot; in Japanese? While you might expect a simple little verb like this would have a simple little translation, that&amp;#39;s not quite the case. Japanese has four different &amp;quot;opens&amp;quot; —  開（あ）ける (akeru),  開（あ）く (aku),  開（ひら）ける (hirakeru) and...</summary>
  </entry>
  <entry>
    <title>もったいない — The Japanese Virtue of Guilt-Tripping over Wastefulness</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/mottainai/"/>
    <id>https://www.tofugu.com/japanese/mottainai/</id>
    <published>2021-08-10T00:00:00Z</published>
    <author>
      <name>Kanae Nakamine</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-08-10-mottainai/header-1280x.jpg" /&gt;Growing up in Japan, I was always told to eat everything that was served on my plate, and not to even waste a grain of rice. If there was something left on my plate, my family would say, eat it up because it&amp;#39;s もったいない mottainai otherwise.


  It expresses...
</summary>
  </entry>
  <entry>
    <title>に vs で: Which Particle To Choose And Why</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/ni-vs-de/"/>
    <id>https://www.tofugu.com/japanese/ni-vs-de/</id>
    <published>2021-07-27T00:00:00Z</published>
    <author>
      <name>Mami Suzuki</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-07-27-ni-vs-de/header-1280x.jpg" /&gt;Particles に and で are grammar elements you’ll encounter in the early stages of your Japanese learning journey. Even though you learn them as a beginner, many learners mix them up even as they progress into intermediate and advanced levels of Japanese...</summary>
  </entry>
  <entry>
    <title>A Review of "Polar Bear Café"</title>
    <link rel="alternate" href="https://www.tofugu.com/reviews/shirokuma-cafe/"/>
    <id>https://www.tofugu.com/reviews/shirokuma-cafe/</id>
    <published>2021-07-13T00:00:00Z</published>
    <author>
      <name>Kanae Nakamine</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/reviews/2021-07-13-shirokuma-cafe/header-1280x.jpg" /&gt;Manga? Check. Slice of life? Check. Short yet natural sentences? Check. Cute but not-too-childish illustrations? Check! ✅

The manga series, しろくまカフェ (Shirokuma Café) checks off all the boxes for what a popular Japanese learning resource is. There are...</summary>
  </entry>
  <entry>
    <title>New Japanese Learning Resources: Summer 2021</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/japanese-learning-resources-summer-2021/"/>
    <id>https://www.tofugu.com/japanese/japanese-learning-resources-summer-2021/</id>
    <published>2021-06-22T00:00:00Z</published>
    <author>
      <name>Kanae Nakamine and Rachel Grant</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-06-22-japanese-learning-resources-summer-2021/header-1280x.jpg" /&gt;This summer&amp;#39;s going to be one for the books! For some of us, that may mean workbooks. Whether you&amp;#39;re beating the heat by staying indoors with AC, or you&amp;#39;re soaking up some rays outside, make sure you bring along study materials with you. You&amp;#39;ll find...</summary>
  </entry>
  <entry>
    <title>中 vs 内: The Difference Between These Two Japanese Words for ''Inside''</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/naka-vs-uchi/"/>
    <id>https://www.tofugu.com/japanese/naka-vs-uchi/</id>
    <published>2021-04-29T00:00:00Z</published>
    <author>
      <name>Mami Suzuki and Jenny Stainton</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-04-29-naka-vs-uchi/header-1280x.jpg" /&gt;If you&amp;#39;re reading this, I&amp;#39;m assuming you already know the words 中 (naka) and 内 (uchi). But do you really know them? Most dictionaries list &amp;quot;inside&amp;quot; as the first definition for both 中 and 内. Our kanji learning app WaniKani also teaches the primary meaning...</summary>
  </entry>
  <entry>
    <title>New Japanese Learning Resources: Spring 2021</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/japanese-learning-resources-spring-2021/"/>
    <id>https://www.tofugu.com/japanese/japanese-learning-resources-spring-2021/</id>
    <published>2021-03-23T00:00:00Z</published>
    <author>
      <name>Cameron Lombardo, Jenny Stainton, Kanae Nakamine, Machiko Yasuda, Mami Suzuki, and Rachel Grant</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-03-23-japanese-learning-resources-spring-2021/header-1280x.jpg" /&gt;With signs of spring approaching, a wide array of Japanese learning resources have bloomed. We picked the ones we really like, and we hope they help you put a spring in your step as you study Japanese!


  観劇三昧 / Kangeki Zanmai
  白川静さんに学ぶ これが日本語
 ...</summary>
  </entry>
  <entry>
    <title>Japanese Books for Upper Beginners</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/japanese-books-for-upper-beginners/"/>
    <id>https://www.tofugu.com/japanese/japanese-books-for-upper-beginners/</id>
    <published>2021-03-01T00:00:00Z</published>
    <author>
      <name>Kanae Nakamine</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-03-01-japanese-books-for-upper-beginners/header-1280x.jpg" /&gt;You&amp;#39;ve been learning Japanese for a while, and reading example sentences in textbooks or materials intended for Japanese learners, like graded readers, has started feeling a bit boring to you. Now that you have a good foundation of vocabulary and grammar...</summary>
  </entry>
  <entry>
    <title>Is あなた Polite or Rude?</title>
    <link rel="alternate" href="https://www.tofugu.com/japanese/anata/"/>
    <id>https://www.tofugu.com/japanese/anata/</id>
    <published>2021-01-19T00:00:00Z</published>
    <author>
      <name>Kanae Nakamine</name>
    </author>
    <summary type="html">&lt;img src="https://files.tofugu.com/articles/japanese/2021-01-19-anata/header-1280x.jpg" /&gt;Hey, you!

Yeah, you. I&amp;#39;m talking to you. I mean, who else would I be talking to?

…Oh, wait, wait…please don&amp;#39;t stop reading yet! I&amp;#39;m sorry if I came off as rude. I only did it to make a point, because that&amp;#39;s what this article is about.

The Japanese...</summary>
  </entry>
</feed>
`;

  const tlHTML = `
    <img
      src="https://www.tofugu.com/images/layout/tofugu-text-logo-fbbfa75f.png"
      alt="tofugu logo"
    />
    <table class="tofuguBlog">
    </table>
  `;

  function tag(entry, tagName) {
    return entry.getElementsByTagName(tagName)[0];
  }

  const today = new Date();

  function daysAgo(entry) {
    let publishedDate = new Date(tag(entry, "published").textContent);
    let diff = (today.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24); // divide by # milliseconds per day
    return Math.round(diff);
  }

  function html2txt(html) {
    return html.replace(/<(?:.|\n)*?>/gm, "");
  }

  function summary(entry) {
    return html2txt(tag(entry, "summary").textContent).slice(0, 200);
  }

  function parseXml(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const html = Array.from(xmlDoc.getElementsByTagName("entry")).map(
      (entry) => `<tr>
        <td class="tofugu-article">
          <a href="${tag(entry, "link").getAttribute("href")}">${
        tag(entry, "title").innerHTML
      }</a>
        </td>
      <td class="tofugu-age">${daysAgo(entry)}d</td>
      </tr>`
    );

    return html;
  }

  const tableRows = parseXml(rawFeed);

  // Create a section for our html
  const tlSection = document.createElement("Section");
  tlSection.classList.add("tofugu-latest");
  tlSection.innerHTML = tlHTML;

  // Add most recent items from the feed to the html
  for (let i in tableRows.slice(0, numberOfArticles)) {
    let tr = document.createElement("tr");
    tr.innerHTML = tableRows[i];
    tlSection.querySelector(".tofuguBlog").append(tr);
  }

  // Now add our new div at the just before the forum list
  document.querySelector(".forum-topics-list").before(tlSection);
})();
