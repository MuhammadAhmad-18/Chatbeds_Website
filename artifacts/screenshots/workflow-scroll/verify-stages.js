(async () => {
  const track = document.querySelector('.workflow-track');
  const scene = document.querySelector('.workflow-scene');
  const controls = [...document.querySelectorAll('.workflow-step')];
  const expected = [
    ['Checked out', 'Guest checked out. Room 301 is marked for cleaning.'],
    ['To clean', 'Room 301 is ready for cleaning. Assigned to your shift.'],
    ['Being cleaned', 'Room 301 is ready for cleaning.'],
    ['To inspect', '301 clean'],
    ['To inspect', 'Room 301 ready for inspection. Please review.'],
    ['Ready', 'Inspection passed. Room 301 is Ready.'],
    ['Ready', 'Room 301 is available. Front desk is up to date.'],
  ];
  const wait = () => new Promise(resolve => setTimeout(resolve, 80));
  const start = track.getBoundingClientRect().top + scrollY - 20;
  const distance = innerWidth < 900 ? 180 : 210;
  const results = [];
  if (track.dataset.scrollMode !== 'true') throw new Error('Expected scroll mode in this viewport');
  for (const direction of [[0,1,2,3,4,5,6],[6,5,4,3,2,1,0]]) {
    for (const index of direction) {
      window.scrollTo({top: start + distance * index, behavior: 'instant'});
      await wait();
      const actual = Number(scene.dataset.stepIndex);
      const status = document.querySelector('.workflow-room > .status').textContent.trim();
      const message = document.querySelector('.wa-workflow-messages .wa-bubble p').textContent;
      const completed = document.querySelectorAll('.workflow-step.completed .step-number svg').length;
      if (actual !== index || status !== expected[index][0] || message !== expected[index][1] || completed !== index + 1) {
        throw new Error(JSON.stringify({index,actual,status,message,completed}));
      }
      if (scene.getBoundingClientRect().top < 19 || scene.getBoundingClientRect().bottom > innerHeight) throw new Error('Sticky scene is clipped');
      results.push({stage:index+1,status,completed});
    }
  }
  for (const index of [4,2,6]) {
    controls[index].click(); await wait();
    if (Number(scene.dataset.stepIndex) !== index) throw new Error('Manual selection failed');
  }
  for (let index=0; index<2; index++) {
    document.querySelector('.workflow-play').click(); await wait();
    if (scene.dataset.stepIndex !== '0') throw new Error('Replay failed');
    controls[6].click(); await wait();
  }
  window.scrollTo({top: start + distance * 6 + scene.offsetHeight + 80, behavior:'instant'});
  await wait();
  if (scene.getBoundingClientRect().top >= 20) throw new Error('Scene did not release');
  controls[3].click(); await wait();
  return {width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth,results,manual:'passed',replay:'passed',release:'passed'};
})()
