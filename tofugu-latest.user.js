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

  const tlCSS = `
    .tofugu-latest {
      display: flex;
      font-family: "Ubuntu", Helvetica, Arial, sans-serif;
      font-size: 14px;
      background-color: #d5d5d5;
      border-radius: 5px;
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

  const tlHTML = `
    <img
      src="https://www.tofugu.com/images/layout/tofugu-text-logo-fbbfa75f.png"
      alt="tofugu logo"
    />
    <table>
      <tr>
        <td class="tofugu-article">
          <a href="https://www.tofugu.com/japanese/futokoro/"
            >Futokoro — A Deep Pocket Full of Unique Expressions</a
          >
        </td>
        <td class="tofugu-age">5d</td>
      </tr>
      <tr>
        <td class="tofugu-article">
          <a href="https://www.tofugu.com/japanese/akeru-aku-hirakeru-hiraku/"
            >あ ける, あく, ひらける, and ひらく: Differences Between Four
            Different "OPEN"s in Japanese</a
          >
        </td>
        <td class="tofugu-age">19d</td>
      </tr>
      <tr>
        <td class="tofugu-article">
          <a href="https://www.tofugu.com/japanese/mottainai/"
            >もったいない — The Japanese Virtue of Guilt-Tripping over
            Wastefulness</a
          >
        </td>
        <td class="tofugu-age">33d</td>
      </tr>
    </table>
  `;

  // Create a section for our html
  const tlSection = document.createElement("Section");
  tlSection.classList.add("tofugu-latest");
  tlSection.innerHTML = tlHTML;

  // Now add our new div at the just before the forum list
  document.querySelector(".forum-topics-list").before(tlSection);
})();
