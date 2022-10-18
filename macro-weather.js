const rollWeather = async ({ cold, wind }) => {

  const rwind = await game.tables.getName("Wind").roll({ roll: new Roll(`1d6 + ${wind}`) });
  const snow = await game.tables.getName("Snow").roll();
  const roll =
    rwind.results[0].data.range[0] === 6 ? new Roll(`1d6 + 2 + ${cold}`) : rwind.results[0].data.range[0] === 4 ? new Roll(`1d6 + 1 + ${cold}`) : null;
  const rcold = await game.tables.getName("Cold").roll({ roll: roll ? roll : null });
  const results = [
    rwind.results[0].data,
    snow.results[0].data,
    rcold.results[0].data,
  ];

  const chatData = {
    content: `<div class="forbidden-lands chat-item" style="margin: auto;">
			<h3>Weather</h3>
			<br>
			<h4>Wind</h4>
			<p style="padding:10px, margin-top: -10px;">${results[0].text.replace(
      /\s/g,
      " "
    )}</p>
			<h4>Fall</h4>
			<p style="padding:10px, margin-top: -10px;">${results[1].text.replace(
      /\s/g,
      " "
    )}</p>
			<h4>Cold</h4>
			<p style="padding:10px, margin-top: -10px;">${results[2].text.replace(
      /\s/g,
      " "
    )}</p></div>`,
  };
  ChatMessage.create(chatData, {});
}

const dialog = new Dialog({
  title: 'Bitter Reach - Weather',
  content: '<h3>What region is the group located in?</h3>',
  buttons: {
    wolvenhome: {
      label: 'Wolvenhome',
      callback: () => {
        rollWeather({ wind: 0, cold: 0 })
      }
    },
    trottersmark: {
      label: 'Trottersmark',
      callback: () => {
        rollWeather({ wind: 0, cold: 0 })
      }
    },
    fallowmoor: {
      label: 'Fallowmoor',
      callback: () => {
        rollWeather({ wind: 0, cold: 0 })
      }
    },
    ashenmark: {
      label: 'Ashenmark',
      callback: () => {
        rollWeather({ wind: 0, cold: 0 })
      }
    },
    mormaGlacier: {
      label: 'Morma Glacier',
      callback: () => {
        rollWeather({ wind: 1, cold: 1 })
      }
    },
    barrenHills: {
      label: 'Barren Hills',
      callback: () => {
        rollWeather({ wind: 2, cold: 2 })
      }
    },
    icemoor: {
      label: 'Icemoor',
      callback: () => {
        rollWeather({ wind: 1, cold: 3 })
      }
    },
    whitePeaks: {
      label: 'White Peaks',
      callback: () => {
        rollWeather({ wind: 2, cold: 3 })
      }
    },
    seaIce: {
      label: 'Sea of Ice',
      callback: () => {
        rollWeather({ wind: 0, cold: 2 })
      }
    }
  }
}).render(true)
