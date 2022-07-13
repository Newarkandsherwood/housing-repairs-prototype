(function(){

    var data_url = 'https://csv-to-json.herokuapp.com/?csv=https://docs.google.com/spreadsheets/d/e/2PACX-1vSlSWjaCm1lqMinAFZBzXHg5W6B5QxNP6L34K25GA0L2jU_o0d4nbpkVDPLEQRFXidkQhnuwEF_FEyg/pub?output=csv';
    var newsArticlesSection = $('#radios-options');
  
    $.getJSON(data_url)
    .then((articles) => {
      newsArticlesSection.html('');
      articles.forEach(article => {
        newsArticlesSection.append(`
        <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="where-do-you-live-${article.Id}" name="where-do-you-live" type="radio" value="${article.headline}">
        <label class="govuk-label govuk-radios__label" for="where-do-you-live-${article.Id}">
        ${article.What}
        </label>
      </div>
      
        `);
      });
    });
  })();

  