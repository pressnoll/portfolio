import './contact.css';
const form=document.querySelector('#message-form');
form?.addEventListener('submit',async(event)=>{
 event.preventDefault();
 const button=form.querySelector('button[type="submit"]');
 if(button.disabled||!form.reportValidity())return;
 const status=document.querySelector('#message-status');
 if(form.elements._honey.value)return;
 button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');
 status.textContent='Sending your message…';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
  const result=await response.json();
  if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Submission rejected');
  status.textContent='Your message has been submitted. Thank you for getting in touch.';
  form.reset();
 }catch{
  status.textContent='We couldn’t confirm your message was sent. Your text is still here. Please try again, email me, or use WhatsApp.';
 }finally{
  clearTimeout(timeout);button.disabled=false;button.textContent='Send message ↗';form.removeAttribute('aria-busy');
 }
});
