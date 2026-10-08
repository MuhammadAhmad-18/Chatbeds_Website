(() => {
  const form = document.querySelector('main .contact-message-form');
  const fields = [...form.querySelectorAll('input,textarea')];
  const emptyRejected = !form.checkValidity();
  const name = form.elements.namedItem('name');
  const email = form.elements.namedItem('email');
  const message = form.elements.namedItem('message');
  name.value = 'Jordan Hotel'; email.value = 'invalid-email'; message.value = 'Please show us the front desk workflow.';
  const invalidEmailRejected = !form.checkValidity() && email.validity.typeMismatch;
  email.value = 'jordan@example.com';
  const validAccepted = form.checkValidity();
  const metadata = fields.map(field => ({name:field.name,type:field.type,required:field.required,maxLength:field.maxLength,autocomplete:field.autocomplete,label:field.labels?.[0]?.textContent.trim(),fontSize:getComputedStyle(field).fontSize}));
  form.reset();
  const nr = name.getBoundingClientRect(), er = email.getBoundingClientRect(), cr = form.getBoundingClientRect();
  return {viewport:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,fieldCount:fields.length,emptyRejected,invalidEmailRejected,validAccepted,metadata,sideBySide:Math.abs(nr.y-er.y)<2,card:{x:cr.x,width:cr.width},buttonHeight:form.querySelector('button[type=submit]').getBoundingClientRect().height};
})()
