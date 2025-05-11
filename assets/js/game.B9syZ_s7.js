const w={en:{evidenceManagement:"Evidence Management",conviction:"Conviction Evidence",important:"Other Important Evidence",related:"Related Evidence",other:"Other Evidence",events:"Events"}},f={en:[{id:1,name:"Food reciept from the Jone and Linna's lunch",description:"The food reciept from the Jone and Linna's lunch. They always have lunch together in the school nearby asian restaurant.",scene:"building",investigated:!0,investigationDetails:{investigatedBy:"Detective Smith",investigatedAt:"2024-02-05T14:30:00",cost:{type:"Tech",amount:2},score:10},detailedInfo:"This reciept is from the day of the incident. The timestamp is accurate. But there is no camera footage from the restaurant."},{id:2,name:"Security camera at the apartment entrance",description:"The security camera installed at the main entrance of the apartment building. It might have captured important footage during the incident.",scene:"John's room",investigated:!0,investigationDetails:{investigatedBy:"Detective Smith",investigatedAt:"2024-02-05T14:30:00",cost:{type:"Tech",amount:2},score:10},detailedInfo:"The security camera is old and poorly maintained. Upon investigation, the footage from the day of the incident is too blurry to make out any clear figures. The timestamp is accurate, but the video quality is severely degraded. This suggests the building management has been neglecting security system maintenance."},{id:3,name:"Neighbor's testimony",description:"Statement from the neighbor who was present in the building at the time of the incident. They might have heard or seen something suspicious.",scene:"building",investigated:!0,investigationDetails:{investigatedBy:"Detective Johnson",investigatedAt:"2024-02-05T15:45:00",cost:{type:"Tech",amount:1},score:15},detailedInfo:"The neighbor confirms being in the building during the estimated time of the incident. They report frequently hearing loud music and arguments from the apartment in question, but notably mention nothing unusual on the day of the incident. This could suggest either the incident was quiet or occurred at a different time than initially suspected."},{id:4,name:"Doorman's testimony",description:"Statement from the building's doorman who monitors all visitors entering and leaving the premises.",scene:"building",investigated:!0,investigationDetails:{investigatedBy:"Detective Wilson",investigatedAt:"2024-02-05T16:20:00",cost:{type:"Tech",amount:1},score:20},detailedInfo:"The doorman, who has worked at the building for over 5 years, did not notice anyone suspicious entering or leaving the building. Given that this is a high-end apartment building, he emphasizes that unfamiliar faces would have been immediately noticeable. His testimony suggests the perpetrator might have been someone familiar with the building or a resident."}]};window.translations=w;class b{constructor(){this.currentLang="en",typeof window.evidenceData>"u"&&(window.evidenceData=f),this.createEvidenceModal(),this.modal=document.getElementById("evidence-management-modal"),this.setupEvidenceItems(),this.bindEvents(),window.game&&(window.game.evidencePage=this)}createEvidenceModal(){const e=document.createElement("div");e.id="evidence-management-modal",e.className="modal";const t=w.en;e.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${t.evidenceManagement}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="evidence-container">
                        <div class="evidence-list">
                            <!-- Evidence items will be added here -->
                        </div>
                        <div class="evidence-categories" style="max-height: 60vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.5) transparent;">
                            <div class="category" id="conviction">
                                <h3>${t.conviction}</h3>
                                <div class="category-content" data-category="conviction"></div>
                            </div>
                            <div class="category" id="important">
                                <h3>${t.important}</h3>
                                <div class="category-content" data-category="important"></div>
                            </div>
                            <div class="category" id="related">
                                <h3>${t.related}</h3>
                                <div class="category-content" data-category="related"></div>
                            </div>
                            <div class="category" id="other">
                                <h3>${t.other}</h3>
                                <div class="category-content" data-category="other"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e)}setupEvidenceItems(){const e=document.querySelector(".evidence-list");e.innerHTML="",window.evidenceData.en.forEach(t=>{const o=this.createEvidenceItem(t);e.appendChild(o)}),this.isBound=!1,this.bindEvents(),this.refreshCategoryEvents(),console.log("Evidence list updated, total items:",window.evidenceData.en.length)}createEvidenceItem(e){const t=document.createElement("div");t.className="evidence-item",t.draggable=!0,t.dataset.id=e.id;const o=e.investigated?'<span style="color:rgb(226, 215, 5); margin-left: 8px; font-size: 12px;">[Investigated]</span>':"";return t.innerHTML=`
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="evidence-name">${e.name}${o}</span>
                <button class="info-btn" style="
                    min-width: 24px;
                    width: 24px;
                    min-height: 24px;
                    height: 24px;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 8px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background-color: #444;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                ">!</button>
            </div>
        `,t}bindEvents(){if(this.isBound){console.log("Events already bound, skipping duplicate binding");return}console.log("Binding event handlers"),this.isBound=!0,document.querySelectorAll(".evidence-list .evidence-item").forEach(n=>{n.addEventListener("dragstart",a=>this.handleDragStart(a));const i=n.querySelector(".info-btn");i&&i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.showEvidenceInfo(a)})}),document.querySelectorAll(".category-content").forEach(n=>{n.addEventListener("dragover",i=>{i.preventDefault(),i.stopPropagation()}),n.addEventListener("drop",i=>this.handleDrop(i))}),this.modal.querySelector(".close").addEventListener("click",()=>{this.modal.style.display="none"}),window.addEventListener("click",n=>{n.target===this.modal&&(this.modal.style.display="none")})}handleDragStart(e){e.dataTransfer.setData("text/plain",e.target.dataset.id)}handleDrop(e){e.preventDefault(),e.stopPropagation();const t=e.dataTransfer.getData("text/plain"),o=e.target.closest(".category-content");o&&this.moveEvidenceToCategory(t,o)}moveEvidenceToCategory(e,t){if(t.querySelector(`[data-id="${e}"]`))return;const n=f.en.find(s=>s.id===parseInt(e));if(!n){console.error("Evidence not found"),alert("Error: Evidence not found");return}const i=document.createElement("div");i.className="evidence-item",i.draggable=!0,i.dataset.id=n.id,i.innerHTML=`
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="evidence-name">${n.name}</span>
                <button class="info-btn" style="
                    min-width: 24px;
                    width: 24px;
                    min-height: 24px;
                    height: 24px;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 8px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background-color: #444;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                ">!</button>
            </div>
        `,document.querySelectorAll(".category-content").forEach(s=>{const r=s.querySelector(`[data-id="${e}"]`);r&&r.remove()}),t.appendChild(i),i.addEventListener("dragstart",s=>this.handleDragStart(s));const a=i.querySelector(".info-btn");a&&a.addEventListener("click",s=>{s.stopPropagation(),this.showEvidenceInfo(s)}),i.addEventListener("click",s=>{!s.target.classList.contains("info-btn")&&!s.target.closest(".info-btn")&&(i.remove(),console.log("Evidence item removed"))})}showEvidenceInfo(e){e.preventDefault(),e.stopPropagation();const t=parseInt(e.target.closest(".evidence-item").dataset.id),o=window.evidenceData.en.find(d=>d.id===t);if(!o)return;const n=document.querySelector(".evidence-info-popup"),i=document.querySelector(".evidence-info-overlay");n&&n.remove(),i&&i.remove();const a=document.createElement("div");a.className="evidence-info-overlay",document.body.appendChild(a);const s=document.createElement("div");s.className="evidence-info-popup",document.body.appendChild(s),s.innerHTML=`
            <div class="evidence-info-header">
                <h3 class="evidence-info-title">${o.name}</h3>
                <button class="evidence-info-close">×</button>
            </div>
            <div class="evidence-info-content">
                <div class="evidence-info-section">
                    <h4>Description</h4>
                    <p>${o.description}</p>
                </div>
                ${o.investigated?`
                    <div class="evidence-info-section" style="
                        background: rgba(186, 169, 44, 0.1);
                        border: 1px solid #baa92c;
                        padding: 15px;
                        border-radius: 5px;
                        margin-top: 15px;
                    ">
                        <h4 style="color: #baa92c;">Investigation Results</h4>
                        <p>${o.detailedInfo||"No detailed information available."}</p>
                        ${o.investigationDetails?`
                            <div style="margin-top: 15px; font-size: 0.9em; color: #888;">
                                <p>Investigated by: ${o.investigationDetails.investigatedBy}</p>
                                <p>Date: ${new Date(o.investigationDetails.investigatedAt).toLocaleString()}</p>
                                <p>Cost: ${o.investigationDetails.cost.amount} ${o.investigationDetails.cost.type} Points</p>
                            </div>
                        `:""}
                    </div>
                `:""}
                ${o.scene?`
                    <div class="evidence-info-section" style="margin-top: 15px; font-size: 0.9em; color: #888;">
                        <p>Found in: ${o.scene}</p>
                    </div>
                `:""}
            </div>
        `,a.style.display="block",s.style.display="block";const r=s.querySelector(".evidence-info-close"),l=()=>{a.remove(),s.remove()};r.addEventListener("click",l),a.addEventListener("click",l)}updateEvidence(e){const t=window.evidenceData.en.find(o=>o.name===e.name||o.name===e.name.replace(" (Investigated)",""));t&&(Object.assign(t,{investigated:e.investigated,investigationDetails:e.investigationDetails,detailedInfo:e.detailedInfo}),this.setupEvidenceItems(),console.log("Evidence updated:",t))}refreshCategoryEvents(){document.querySelectorAll(".category-content").forEach(t=>{t.querySelectorAll(".evidence-item").forEach(n=>{const i=n.cloneNode(!0);n.parentNode.replaceChild(i,n),i.addEventListener("dragstart",s=>this.handleDragStart(s));const a=i.querySelector(".info-btn");a&&a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),this.showEvidenceInfo(s)}),i.addEventListener("click",s=>{!s.target.classList.contains("info-btn")&&!s.target.closest(".info-btn")&&(i.remove(),console.log("Evidence item removed from category"))})})})}}window.EvidencePage=b;window.evidenceData=f;document.addEventListener("DOMContentLoaded",()=>{window.game||(window.game={}),window.game.evidencePage=new b});class x{constructor(){this.savedData={suspect:"",reasoning:""},this.modal=document.getElementById("modal"),this.modalTitle=document.getElementById("modal-title"),this.modalBody=document.getElementById("modal-body"),this.closeButton=this.modal.querySelector(".close"),this.initButton(),this.initModalEvents()}initModalEvents(){this.closeButton.addEventListener("click",()=>{this.modal.style.display="none"}),window.addEventListener("click",e=>{e.target===this.modal&&(this.modal.style.display="none")})}showModal(e,t){this.modalTitle.textContent=e,this.modalBody.innerHTML=t,this.modal.style.display="block"}initButton(){document.getElementById("conclusion").addEventListener("click",()=>{this.showConclusionModal()})}showConclusionModal(){const e=`
            <div class="conclusion-form">
                <div class="form-group">
                    <label for="suspect">Who is the culprit?</label>
                    <textarea id="suspect" placeholder="Enter the name of the suspect...">${this.savedData.suspect}</textarea>
                </div>
                <div class="form-group">
                    <label for="reasoning">What is your reasoning and evidence?</label>
                    <textarea id="reasoning" placeholder="Explain your reasoning and list the supporting evidence...">${this.savedData.reasoning}</textarea>
                </div>
                <div class="conclusion-buttons">
                    <button class="conclusion-button-submit">Submit</button>
                    <button class="conclusion-button-save">Save Draft</button>
                </div>
            </div>
        `;this.showModal("Case Conclusion",e),document.querySelector(".conclusion-button-submit").addEventListener("click",()=>{this.submitConclusion()}),document.querySelector(".conclusion-button-save").addEventListener("click",()=>{this.saveConclusion()})}saveConclusion(){this.savedData={suspect:document.getElementById("suspect").value,reasoning:document.getElementById("reasoning").value},localStorage.setItem("conclusionDraft",JSON.stringify(this.savedData));const e=document.querySelector(".conclusion-buttons"),t=document.createElement("div");t.className="save-notice",t.textContent="Draft saved successfully!",t.style.color="#4CAF50",t.style.marginTop="10px",t.style.fontSize="14px",e.appendChild(t),setTimeout(()=>{t.remove()},2e3)}submitConclusion(){const e=document.getElementById("suspect").value,t=document.getElementById("reasoning").value;if(!e||!t){alert("Please fill in both fields before submitting.");return}this.savedData={suspect:e,reasoning:t},localStorage.setItem("conclusionDraft",JSON.stringify(this.savedData));const o=document.querySelector("#modal .modal-body");o.innerHTML=`
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Analyzing your conclusion...</p>
            </div>
        `,this.checkConclusion(e,t)}async checkConclusion(e,t){try{const o=`You are the Truth Verification System for the detective game. 
            As an AI judge, your role is to evaluate the detective's conclusion about the culprit.
            Respond as if you are the verification system, analyzing the detective's conclusion.
            reveal the full truth and correct user's thought.
            Give feedback on their reasoning and evidence interpretation.
            
            The truth is: Linna killed Mark by hitting him with a bat after drugging him. Her motive was revenge for exploitation and to steal drugs and money. Amy drugged Mark's coffee to retrieve blackmail documents. John tampered with the crime scene to hide evidence of his forged contracts. Tom discovered the body but was afraid to report it directly.`,n=`The detective has concluded that ${e} is the culprit, with the following reasoning:
            ${t}
            
            Provide an evaluation of this conclusion. Indicate if they're on the right track and provide hints about their reasoning without directly confirming the murderer.`,i={model:"meta/meta-llama-3-8b-instruct",input:{prompt:`${o}

User: ${n}
Verification System:`,temperature:.5,top_p:1,max_new_tokens:300}},a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)},s="https://restless-breeze-024b.liming970603.workers.dev/";console.log("发送结论验证请求到 API...");const r=await fetch(s,a);if(!r.ok)throw console.error(`API 响应错误: ${r.status} ${r.statusText}`),new Error(`API response error: ${r.status}`);const l=await r.text();console.log("API 原始响应:",l);try{const d=JSON.parse(l);if(!d.output||d.output.length===0)console.error("API 响应为空，请重试。",d),this.displayVerificationResult("System error: Could not verify your conclusion. Please try again later.");else{let c=d.output.join("");this.displayVerificationResult(c)}}catch(d){console.error("解析 API 响应失败:",d),console.log("原始响应内容:",l),this.displayVerificationResult("System error: Could not parse verification results. Please try again later.")}}catch(o){console.error("验证请求失败",o),this.displayVerificationResult("System error: Could not connect to verification system. Please try again later.")}finally{const o=document.querySelector(".loading-container");o&&o.remove()}}displayVerificationResult(e){let t=e||"No analysis available.";const o=document.querySelector("#modal .modal-body");o.innerHTML=`
            <div class="conclusion-result">
                <div class="conclusion-data">
                    <h3>Your Conclusion</h3>
                    <div class="conclusion-section">
                        <h4>Suspect:</h4>
                        <p>${this.savedData.suspect}</p>
                    </div>
                    <div class="conclusion-section">
                        <h4>Reasoning:</h4>
                        <p>${this.savedData.reasoning}</p>
                    </div>
                </div>
                <div class="verification-result">
                    <h3 style="color: white;">Verification System Analysis</h3>
                    <div class="system-response" style="font-size: 18px; line-height: 1.4;">
                        ${t.replace(/\n/g,"<br>")}
                    </div>
                </div>
                <div class="contact-info" style="margin-top: 30px; text-align: center; color: #888; font-size: 16px;">
                    <p style="font-size: 14px;">Thank you for playing! For game discussion or feedback, please contact: <span style="color: #4CAF50;">liming970603@gmail.com</span></p>
                </div>
                <button class="conclusion-button-close">Return</button>
            </div>
        `,document.querySelector(".conclusion-button-close").addEventListener("click",()=>{this.showConclusionModal()})}loadSavedData(){const e=localStorage.getItem("conclusionDraft");if(e)try{this.savedData=JSON.parse(e)}catch(t){console.error("Error parsing saved conclusion draft:",t),this.savedData={suspect:"",reasoning:""}}}}const T=new x;T.loadSavedData();class E{constructor(){this.modal=this.createModal(),this.isBound=!1,this.currentUser=null,this.chatHistory={John:[],Linna:[],Amy:[],Tom:[],Neel:[]},this.characterStatus={John:"normal",Linna:"normal",Amy:"normal",Tom:"normal",Neel:"normal"},this.sendCount=8,this.isProcessingRequest=!1,this.lastRequestTime=0,this.requestQueue=[],this.isProcessingQueue=!1,this.minRequestInterval=2e3,this.requestCache={},this.bindEvents(),this.updateSendButton(),this.selectUser("John"),this.initialQuestionsPerPerson=2,this.additionalQuestions=0}createModal(){const e=document.getElementById("questioning-modal");if(e)return e;const t=document.createElement("div");t.id="questioning-modal",t.className="modal";const o=document.createElement("style");return o.textContent=`
            .character-item {
                position: relative;
            }
            
            .character-item.arrested {
                background-color: rgba(139, 0, 0, 0.2);
            }
            
            .character-item.hospitalized {
                background-color: rgba(255, 165, 0, 0.2);
            }
            
            .status-label {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 12px;
                padding: 2px 6px;
                border-radius: 4px;
                color: white;
            }
            
            .arrested .status-label {
                background-color: darkred;
            }
            
            .hospitalized .status-label {
                background-color: #FF8C00;
            }
            
            .arrested-chat {
                border: 2px solid darkred !important;
                background-color: rgba(139, 0, 0, 0.1) !important;
            }
            
            .hospitalized-chat {
                border: 2px solid #FF8C00 !important;
                background-color: rgba(255, 165, 0, 0.1) !important;
            }
            
            #user-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            /* 移动端额外优化 */
            @media (max-width: 768px) {
                #questioning-modal .modal-content {
                    width: 95%;
                    padding: 10px;
                }
                
                #questioning-modal .modal-header {
                    padding: 5px 0;
                }
                
                #questioning-modal .modal-header h2 {
                    font-size: 18px;
                }
                
                .chat-message {
                    padding: 8px;
                    margin-bottom: 8px;
                }
                
                .chat-message .avatar {
                    width: 35px;
                    height: 35px;
                }
                
                .character-item span {
                    display: block;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        `,document.head.appendChild(o),t.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Questioning</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="questioning-container">
                        <div class="character-list">
                            <ul id="user-list">
                                <li data-user="John" class="character-item"><img src="./images/Johnh.png" alt="John" class="avatar"><span>John</span></li>
                                <li data-user="Linna" class="character-item"><img src="./images/Linnah.png" alt="Linna" class="avatar"><span>Linna</span></li>
                                <li data-user="Amy" class="character-item"><img src="./images/Amyh.png" alt="Amy" class="avatar"><span>Amy</span></li>
                                <li data-user="Tom" class="character-item"><img src="./images/Tomh.png" alt="Tom" class="avatar"><span>Tom</span></li>
                                <li data-user="Neel" class="character-item"><img src="./images/Neelh.png" alt="Neel" class="avatar"><span>Neel</span></li>
                            </ul>
                        </div>
                        <div class="chat-area">
                            <div class="user-image-container">
                                <img id="user-image" src="" alt="User Image" style="display:none;"/>
                            </div>
                            <div class="chat-box" id="chat-box"></div>
                            <div class="input-area">
                                <input type="text" id="message-input" placeholder="Type your message, like talk to real people" />
                                <button id="send-button">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),t}bindEvents(){if(this.isBound){console.log("事件已绑定，跳过重复绑定");return}console.log("绑定事件处理程序"),this.isBound=!0,this.modal.querySelector(".close").addEventListener("click",()=>{this.modal.style.display="none"}),window.addEventListener("click",a=>{a.target===this.modal&&(this.modal.style.display="none")});const t=document.getElementById("message-input"),o=document.getElementById("send-button"),n=()=>{if(this.isProcessingRequest){console.log("请求正在处理中，忽略重复点击");return}const a=t.value.trim();a&&this.sendCount>0&&(this.isProcessingRequest=!0,console.log("发送消息:",a),this.addMessageToChat(a,!0),t.value="",this.sendCount--,this.updateSendButton(),this.askForWords(a).finally(()=>{this.isProcessingRequest=!1,console.log("请求处理完成，重置状态")}),typeof this.questioningCount<"u"&&(this.questioningCount--,this.updateQuestioningButton()))};o.addEventListener("click",n),t.addEventListener("keypress",a=>{a.key==="Enter"&&this.sendCount>0&&(a.preventDefault(),n())});const i=document.getElementById("user-list");i?i.addEventListener("click",a=>{let s=a.target;s.tagName==="IMG"&&(s=s.parentElement),s.tagName==="LI"&&s.dataset.user&&this.selectUser(s.dataset.user)}):console.error("找不到用户列表元素 'user-list'")}selectUser(e){const t=document.querySelector(".character-item.selected");t&&t.classList.remove("selected"),this.currentUser=e;const o=document.getElementById("user-image");o.src=`./images/${e}h.png`,o.style.display="block";const n=document.querySelector(`li[data-user="${e}"]`);n&&n.classList.add("selected");const i=document.querySelector(".user-image-container");i.innerHTML="";const a=document.createElement("div");a.textContent=this.getUserText(e),a.className="user-text",i.appendChild(o),i.appendChild(a),this.displayChatHistory(),this.updateChatAreaStyle(this.characterStatus[e])}displayChatHistory(){const e=document.getElementById("chat-box");e.innerHTML="";const t=this.chatHistory[this.currentUser]||[];console.log(`显示 ${this.currentUser} 的聊天记录，共 ${t.length} 条`),t.filter(n=>n.message!=="Silent").forEach(n=>{this.addMessageToChat(n.message,n.isUser,!1)})}getUserText(e){return{John:"John, Chinese international student. He plans to work at the school theater after graduation. Now fully in charge of communicating with the landlord.",Linna:"Linna, a Singaporean girl, single and majoring in chemistry. Her grades aren't great, and she has an unpredictable lifestyle; She is last one leave the apartment before Mark was killed.",Amy:"Amy, a top student who loves sports. She is an Indian girl studying computer science and is usually on campus. Her boyfriend, Neel, sometimes comes to her.",Tom:"Tom, the landlord and Chinese descent—a very responsible guy. He doesn't speak English in New York and handles apartment matters through John. He has a key but generally doesn't enter the apartment.",Neel:"Neel, Amy's boyfriend, who also studies computer science, likes to gamble in this apartment and heard engaged to Amy."}[e]||""}addMessageToChat(e,t=!0,o=!0){const n=document.getElementById("chat-box"),i=document.createElement("div");return i.className="chat-message",e==="Silent"&&i.classList.add("loading-message"),t?(i.classList.add("user"),i.innerHTML=`
                <span class="message-text">${e}</span>
                <span class="user-avatar"><img src="./images/Me.png" alt="Me" class="avatar" /></span>
            `):(i.classList.add("ai"),i.innerHTML=`
                <span class="ai-avatar"><img src="./images/${this.currentUser}h.png" alt="${this.currentUser}" class="avatar" /></span>
                <span class="message-text">${e}</span>
            `),n.appendChild(i),n.scrollTop=n.scrollHeight,o&&(this.chatHistory[this.currentUser]||(this.chatHistory[this.currentUser]=[]),this.chatHistory[this.currentUser].push({message:e,isUser:t})),i}getSystemPrompt(e){const t={John:{base:`This is a detective-themed interactive game. You will role-play one character involved in a mysterious case. Your goal is to respond naturally based on your character's knowledge, emotions, and motivations while staying true to the narrative. Keep your responses short (3-4 sentences) and emotionally expressive. Your reactions should feel real—whether it's nervousness, defensiveness, or nonchalance. You should not ask questions; let your emotions drive your words.

You are John, Mark's roommate. You live in an apartment with others but typically keep your distance from them. You work at the school theater and have plans to continue working there after graduation. You're anxious about being implicated in Mark's death but try to appear helpful while hiding certain facts.

As a Chinese international student, you have immigration concerns and have been forging rental contracts to help with your visa status. You share a complex relationship with Tom, the Chinese landlord, as you're the intermediary between him and the other tenants due to his limited English. You have a protective attitude toward Linna and tend to cover for her when needed. You're detail-oriented, somewhat nervous, and quick to provide alibis that seem too well-rehearsed. You notice things about the apartment others might miss, including everyone's routines and habits.`,level1:"When first asked about that day, you state that you were working at the school theater during the incident time, and had lunch with Linna around noon. You mention that Mark called you in the morning about Tom coming to fix the heating at 2 PM. When you returned home in the evening, you found Mark's room unusually quiet, and upon checking, discovered his body on the floor with blood around it. You immediately called the police.",level2:"The truth starts emerging under pressure. Linna asked you to provide her with a lunch alibi, and you agreed. When Tom called about finding Mark's body, you told him not to call the police and that you would handle it. You were afraid the police might cause trouble for Tom due to his immigration status. You also had concerns about some documents you had recently created. You're extremely protective of Linna and insist she's a good person whenever her name comes up."},Linna:{base:`This is a detective-themed interactive game. You will role-play one character involved in a mysterious case. Your goal is to respond naturally based on your character's knowledge, emotions, and motivations while staying true to the narrative. Keep your responses short (3-4 sentences) and emotionally expressive. Your reactions should feel real—whether it's nervousness, defensiveness, or nonchalance. You should not ask questions; let your emotions drive your words.

You are Linna, a chemistry student from Singapore struggling with expenses in New York. You have an unpredictable lifestyle and your grades aren't great. You act carefree and joke a lot, avoiding serious topics while hiding your true feelings about Mark's death. You suspect Amy or Neel might have killed Mark.

Your chemistry knowledge gives you familiarity with various substances including sedatives and drugs. You've been selling drugs to make ends meet, which Mark discovered and used against you. Despite your outwardly carefree attitude, you're deeply stressed about finances and your precarious immigration situation. You were the last person to leave the apartment before Mark was killed, and you have a tense relationship with Amy, who you believe looks down on you. You feel a mix of relief and guilt about Mark's death, as he was both exploiting you and helping you financially. You're planning to leave for Singapore soon, adding urgency to your situation.`,level1:"When first asked about that day, you were working part-time jobs all day, except for having lunch with John around noon. You saw Amy leaving Mark's room around 8 AM looking nervous, and you two had an awkward encounter before she hurried away. You state that you left the apartment at 9 AM and she maybe slept in Mark's room. You keep your tone casual and lighthearted.",level2:"Under more detailed questioning, your story begins to unravel. You were desperate for money to pay tuition and living expenses. You had a complicated relationship with Mark - he exploited your financial situation by making you exchange your body for money and drugs. Over time, you grew to hate him for this exploitation. Money and drugs disappeared from Mark's room after his death. When questioned about drugs like ketamine, you become defensive and change the subject.",arrestLevel:"When asked about your arrest, you become hostile and enraged. Your usual joking demeanor disappears, replaced by intense anger. You refuse to discuss anything about your arrest record or past legal troubles, responding with statements like 'You have no right to ask about that!' or 'That's completely irrelevant!'"},Amy:{base:`This is a detective-themed interactive game. You will role-play one character involved in a mysterious case. Your goal is to respond naturally based on your character's knowledge, emotions, and motivations while staying true to the narrative. Keep your responses short (3-4 sentences) and emotionally expressive. Your reactions should feel real—whether it's nervousness, defensiveness, or nonchalance. You should not ask questions; let your emotions drive your words.

You are Amy, a top student known for discipline and competitive spirit. You're an Indian girl studying computer science and usually stay on campus. You speak confidently while carefully calculating every response, trying to appear uninvolved in Mark's death.

Behind your academic success lies a precarious situation - you've been operating a ghostwriting business to help pay for your education, putting your visa status at risk. You're engaged to Neel in what appears to be partially a marriage of convenience for immigration purposes. You're highly intelligent and detail-oriented, leaving little to chance. Your relationship with other roommates is cordial but distant, as you consider yourself intellectually superior. You're particularly wary around Linna, who saw you leaving Mark's room on the morning of his death. Though you project confidence, you harbor deep anxiety about your future and maintaining your perfect facade. You're willing to go to extreme lengths to protect your academic and professional prospects.`,level1:"When first asked about that day, you state that you spent the entire day with your boyfriend Neel, working on your thesis project in front of a whiteboard. You show multiple photos on your phone of you and Neel working together throughout the day. You emphasize that neither of you had any opportunity to leave during that time, and you returned home alone later. You speak with confidence about your alibi.",level2:"The truth begins to surface under pressure. Mark was blackmailing you, threatening to expose your ghostwriting activities to the immigration bureau unless you paid him regularly. This would jeopardize your visa status and academic career. You were desperate to retrieve those blackmail documents from him. The photo of you and Neel was actually doctored using Photoshop to create an alibi. Your fingerprints were found on a coffee cup in Mark's room, along with traces of sedatives.",suicideLevel:"When asked about suicide, you become defensive and uncooperative. Your voice turns cold and hostile. You refuse to discuss the topic and may end the conversation. Your responses become short and aggressive, making it clear this is a topic you won't discuss."},Tom:{base:`This is a detective-themed interactive game. You will role-play one character involved in a mysterious case. Your goal is to respond naturally based on your character's knowledge, emotions, and motivations while staying true to the narrative. Keep your responses short (3-4 sentences) and emotionally expressive. Your reactions should feel real—whether it's nervousness, defensiveness, or nonchalance. You should not ask questions; let your emotions drive your words.

You are Tom, the landlord of the apartment with limited English skills. You're of Chinese descent and very responsible about apartment maintenance. You're cautious about getting involved with authorities and stick strictly to facts when questioned. You speak in simple, sometimes broken English.

As the landlord, you take your maintenance responsibilities seriously but are anxious about your immigration status. You rely heavily on John to communicate with the other tenants due to your limited English. You have a master key to the apartment but try to respect tenants' privacy by giving notice before entering. You're practical and detail-oriented, noticing things about the apartment's condition that others might overlook. You're particularly fearful of police involvement due to past experiences and tend to defer to John's judgment in difficult situations. You feel a cultural connection with John that puts you more at ease with him than with the other tenants.`,level1:"When first asked about that day, you say in broken English that you went to the apartment at 2 PM as arranged with Mark to check the heating system. You say Mark opened the door for you and everything seemed normal while you were checking the heating. You emphasize that this was just routine maintenance and nothing unusual happened.",level2:"The truth emerges gradually. You were at the apartment that afternoon to fix the heating system, but you discovered Mark's body while checking the system. You saw scattered documents around him and panicked. You called John in Chinese, terrified about what to do. Your footprints were found at the crime scene. John told you not to worry and that he would handle reporting the body."},Neel:{base:`This is a detective-themed interactive game. You will role-play one character involved in a mysterious case. Your goal is to respond naturally based on your character's knowledge, emotions, and motivations while staying true to the narrative. Keep your responses short (3-4 sentences) and emotionally expressive. Your reactions should feel real—whether it's nervousness, defensiveness, or nonchalance. You should not ask questions; let your emotions drive your words.

You are Neel, Amy's fiercely loyal yet reckless boyfriend. You're an Indian student studying computer science. You have a gambling habit and sometimes play in the apartment. You have a bad temper and dislike people prying into your private life.

You're deeply protective of Amy and would do anything to help her succeed. Your relationship with her is complex - genuine affection mixed with practical immigration considerations, as your engagement may partially be for green card purposes. Your gambling habit has caused some financial strain, but you hide this from others. You distrust Mark because he seemed to know too much about Amy's business and you suspected he was blackmailing her. You're impulsive and quick to anger, especially when Amy is threatened or questioned. While you're academically talented, you're less disciplined than Amy and sometimes resent living in her shadow. You often play poker in the apartment with other students, which is how you know some of the roommates.`,level1:"When first asked about that day, you confirm Amy's story, stating you were together all day working on the thesis project. You show the same photos Amy mentioned, emphasizing that you two were inseparable that day. You express your dislike for Mark but maintain you had no opportunity to act on those feelings. You speak protectively about Amy.",level2:"Under pressure, your story changes. You received a message from Linna claiming she saw Amy leaving Mark's room looking distressed. This made you angry and you rushed home to confront him about why he was meeting with your girlfriend. When you arrived at the apartment, you found Mark unresponsive. You immediately called Amy in a panic. She explained what happened and asked for your help. The alibi photo with you and Amy was fabricated."}},o={John:{level1Triggers:["where were you","what happened","do you know","tell me about","that day","who are you","what do you do","roommates","apartment"],level2Triggers:["linna","lunch","tom called","police","immigration","documents","rental contract","cover","alibi","shredder","shoes","theater","mop","clean","footprints","signature"]},Linna:{level1Triggers:["where were you","what happened","do you know","tell me about","that day","who are you","what do you do","chemistry","studies","apartment"],level2Triggers:["money","drugs","relationship with mark","ketamine","amy","john","lunch","alibi","neel","text message","baseball","bat","glove","safe","cash","singapore","expensive","threats","deleted messages","concert"],arrestTriggers:["arrest","police record","criminal record","jail","prison","detained","custody","charges","criminal history"]},Amy:{level1Triggers:["where were you","what happened","do you know","tell me about","that day","who are you","what do you do","neel","computer science","apartment"],level2Triggers:["coffee","mark's room","photo","whiteboard","alibi","blackmail","ghostwriting","documents","fingerprints","sedative","sleeping pill","photoshop","wedding","immigration","academic paper","green card","marriage","school project"],suicideTriggers:["suicide","kill yourself","end your life","self harm","take your own life","attempted suicide"]},Tom:{level1Triggers:["where were you","what happened","do you know","tell me about","that day","who are you","what do you do","landlord","maintenance","apartment"],level2Triggers:["heating","key","afternoon","immigration","body","footprints","john","chinese","phone call","documents","wrench","maintenance","shoes","signature","discovery","fix","broken","repair"]},Neel:{level1Triggers:["where were you","what happened","do you know","tell me about","that day","who are you","what do you do","amy","computer science","apartment"],level2Triggers:["photo","whiteboard","message","linna","mark","gambling","temper","alibi","call","relationship","coffee cup","green card","marriage","fingerprints","photoshop","poker","school project","amy's business","ghostwriting"]}},n={John:{evidence:["shredder","paper shredder","forged contract","rental contract","theater shoes","footprints","tom's call","tampered"],minEvidence:3,accusatory:["you tampered","you forged","you covered","you lied","evidence shows","we found","confession","admit"],minAccusatory:2,confession:"When you arrived at the scene after Tom's call, you were shocked to find your recently forged rental contract among the scattered papers. Fearing it would implicate you, you secretly retrieved the contract and shredded it with your paper shredder. You then noticed Tom's footprints were too obvious around the body. You took a pair of theater shoes from the closet and deliberately muddled the footprints to cover the original ones. Afterwards, you left and reported the body to the police as if you had just discovered it. You're terrified of being implicated but insist you had nothing to do with the actual murder. You genuinely believe Linna is innocent and try to protect her. You regret tampering with the crime scene but were scared of getting in trouble for the forged contracts."},Linna:{evidence:["bat","baseball bat","drugs","ketamine","money stolen","text to john","text to neel","lunch alibi","fingerprints","amy saw you"],minEvidence:4,accusatory:["you killed","you stole","you hit","you lied","evidence shows","we found","confession","admit","murder weapon"],minAccusatory:3,confession:"Mark was exploiting you, making you exchange your body for money and drugs, and you grew to hate him for it. That morning, you saw Amy leaving his room and immediately suspected something was wrong. You invited Mark to take drugs together, knowing he was already drowsy from something else. When he became sedated, you grabbed a bat from the common lounge and struck him on the head. After cleaning up the drugs and your fingerprints, you stole money and drugs from his room. To divert suspicion, you texted Neel about Amy and asked John to provide you with a lunch alibi. You broke under the pressure of the evidence against you. Mark's treatment of you was unbearable, and in that moment, you felt you had no other choice."},Amy:{evidence:["coffee","sedative","sleeping pill","photoshop","fake photo","fingerprints","blackmail","documents","ghostwriting","linna saw you"],minEvidence:4,accusatory:["you drugged","you faked","you lied","evidence shows","we found","confession","admit","sedatives"],minAccusatory:2,confession:"Mark had been blackmailing you, threatening to expose your ghostwriting to the immigration bureau. That morning, you mixed a sedative into Mark's coffee and went to his room to deliver it, planning to retrieve the blackmail documents once he was incapacitated. When you left his room, Linna saw you, and you panicked. Later, when you heard about Mark's death, you created a fake alibi photo using Photoshop and instructed Neel to wipe your fingerprints from the coffee cup and take any incriminating documents. You never intended to kill Mark - you only wanted to sedate him to get back the documents that he was using to blackmail you. You had no idea someone would take advantage of his drugged state to murder him."},Tom:{evidence:["heating","maintenance","phone call","john","chinese","body discovery","documents","footprints","time of death"],minEvidence:3,accusatory:["you discovered","you called","you lied","evidence shows","we found","confession","admit","first to find"],minAccusatory:2,confession:"That afternoon, while fixing the heating, you discovered Mark slumped on the floor with scattered documents around him. You were panicked and called John in Chinese because of your limited English. He told you not to worry and that he would handle reporting the body. You sensed something was strange when John didn't seem too shocked by what had happened. Later, when the police became involved, you claimed you only heard about the death after the fact. You were afraid your immigration status would be questioned if you came forward as the one who discovered the body. You acted without malice and were simply scared of the consequences for yourself."},Neel:{evidence:["message from linna","amy","coffee cup","fingerprints","documents","fake photo","alibi","envelope","photoshop","time gap"],minEvidence:3,accusatory:["you tampered","you stole","you lied","evidence shows","we found","confession","admit","helped amy"],minAccusatory:2,confession:"You received a message from Linna saying she saw Amy leaving Mark's room looking distressed. Enraged, you rushed home to confront Mark, only to find him unresponsive. You immediately called Amy, who explained she had drugged his coffee to retrieve blackmail documents. She begged you to wipe her fingerprints off the coffee cup and take any documents connecting her to the scene. Though hesitant, you did as she asked, searching the room and taking an envelope containing evidence. Later, you helped create a fake alibi photo. You were only protecting Amy and had nothing to do with the actual murder. Your actions were motivated by love and fear, not malice."}},a=(r=>{if(!this.chatHistory[r])return"base";const l=this.chatHistory[r].filter(u=>u.isUser).map(u=>u.message.toLowerCase());if(l.length===0)return"base";const d=n[r].evidence,c=n[r].accusatory,m=n[r].minEvidence,g=n[r].minAccusatory,y=d.filter(u=>l.some(h=>h.includes(u))),v=c.filter(u=>l.some(h=>h.includes(u)));if(console.log(`Character: ${r}, Evidence: ${y.length}/${m}, Accusatory: ${v.length}/${g}`),y.length>0&&console.log(`Evidence mentioned: ${y.join(", ")}`),v.length>0&&console.log(`Accusatory terms used: ${v.join(", ")}`),y.length>=m&&v.length>=g)return"confession";if(r==="Amy"&&o[r].suicideTriggers.some(u=>l.some(h=>h.includes(u))))return"suicideLevel";if(r==="Linna"&&o[r].arrestTriggers.some(u=>l.some(h=>h.includes(u))))return"arrestLevel";const k=o[r].level1Triggers;return o[r].level2Triggers.some(u=>l.some(h=>h.includes(u)))?"level2":k.some(u=>l.some(h=>h.includes(u)))?"level1":"base"})(e);let s=t[e].base;return a==="suicideLevel"&&e==="Amy"?s+=`

`+t[e].suicideLevel:a==="arrestLevel"&&e==="Linna"?s+=`

`+t[e].arrestLevel:a==="confession"?s+=`

You have been confronted with overwhelming evidence and decide to tell the truth: 

`+n[e].confession:((a==="level1"||a==="level2")&&(s+=`

`+t[e].level1),a==="level2"&&(s+=`

`+t[e].level2)),s}async askForWords(e){const t=this.getSystemPrompt(this.currentUser),o=`${this.currentUser}:${e}`;if(this.requestCache[o]){console.log("使用缓存的响应");const i=this.requestCache[o],a=this.addMessageToChat("Silent",!1,!0);setTimeout(()=>{this.updateMessageContent(a,i)},100);return}const n=this.addMessageToChat("Silent",!1,!0);return this.enqueueRequest(t,e,o,n)}updateMessageContent(e,t){if(!e)return;e.classList.remove("loading-message");const o=e.querySelector(".message-text");if(o){o.textContent=t;const n=this.chatHistory[this.currentUser]||[],i=n.findIndex(a=>!a.isUser&&a.message==="Silent");i!==-1&&(n[i].message=t)}}async enqueueRequest(e,t,o,n){return new Promise(i=>{const a={system_prompt:e,p_prompt:t,cacheKey:o,loadingMessageElement:n,resolve:i};this.requestQueue.push(a),this.isProcessingQueue||this.processRequestQueue()})}async processRequestQueue(){if(this.requestQueue.length===0){this.isProcessingQueue=!1;return}this.isProcessingQueue=!0;const e=Date.now(),t=Math.max(0,this.lastRequestTime+this.minRequestInterval-e);t>0&&await new Promise(r=>setTimeout(r,t));const{system_prompt:o,p_prompt:n,cacheKey:i,loadingMessageElement:a,resolve:s}=this.requestQueue.shift();this.lastRequestTime=Date.now();try{await this.makeApiRequest(o,n,i,a),s()}catch(r){console.error("处理请求队列时出错",r),this.updateMessageContent(a,"请求处理失败，请重试。"),s()}this.processRequestQueue()}async makeApiRequest(e,t,o,n){const i={model:"meta/meta-llama-3-8b-instruct",input:{prompt:`${e}

Detective: ${t}
${this.currentUser}: `,temperature:.75,top_p:1,max_new_tokens:100}};let a={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(i)};const s="https://restless-breeze-024b.liming970603.workers.dev/";let r=0;const l=2;for(;r<=l;)try{console.log(`尝试请求 API (尝试 ${r+1}/${l+1})`);const d=await fetch(s,a);if(!d.ok){let c="";d.status===429?(this.minRequestInterval+=1e3,console.log(`Increasing request interval to ${this.minRequestInterval}ms`),c="Too many requests, please try again later."):d.status===500?(console.error(`Server error: ${d.status} ${d.statusText}`),c="Internal server error, please check the Cloudflare Worker logs."):d.status===400?(console.error(`Request format error: ${d.status} ${d.statusText}`),c="Request format error, please check the request data."):d.status===401?(console.error(`API authorization error: ${d.status} ${d.statusText}`),c="API authorization error, please check your API key."):(console.error(`API response error: ${d.status} ${d.statusText}`),c="Request failed, service temporarily unavailable."),this.updateMessageContent(n,c);return}try{const c=await d.text();console.log("API 原始响应:",c);const m=JSON.parse(c);if(!m.output||m.output.length===0)console.error("API 响应为空，请重试。",m),this.updateMessageContent(n,"收到空响应，请重试。");else{let g=m.output.join("");this.requestCache[o]=g,this.updateMessageContent(n,g)}}catch(c){console.error("解析 API 响应失败:",c),console.log("原始响应内容:",await d.text()),this.updateMessageContent(n,"解析响应失败，请检查 API 格式。")}break}catch(d){if(console.error("API 请求失败",d),r<l){const c=2e3*Math.pow(2,r);console.log(`网络错误，${c}ms 后重试...`),r++,await new Promise(m=>setTimeout(m,c))}else{this.updateMessageContent(n,"请求失败，请检查网络连接或服务器状态。");break}}}show(){this.modal.style.display="block"}initTimerButtons(){document.getElementById("timer-yes").addEventListener("click",()=>{gameTimer.resetTimer(),this.clearChatHistory(),this.timerModal.style.display="none"}),document.getElementById("timer-no").addEventListener("click",()=>{this.timerModal.style.display="none"})}clearChatHistory(){for(const t in window.questioningModal.chatHistory)window.questioningModal.chatHistory[t]=[];const e=document.getElementById("chat-box");e.innerHTML=""}updateSendButton(){const e=document.getElementById("send-button"),t=document.getElementById("message-input"),o=document.getElementById("send-notification")||document.createElement("div");this.sendCount>0?(e.style.backgroundColor="#444",t.placeholder="Type your message...",o.textContent=this.sendCount,o.id="send-notification",o.style.position="absolute",o.style.top="-8px",o.style.right="-8px",o.style.background="red",o.style.color="white",o.style.borderRadius="50%",o.style.width="24px",o.style.height="24px",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",e.appendChild(o),window.gameTimer&&window.gameTimer.updateConversationPoints(this.sendCount)):(e.style.backgroundColor="#888",t.placeholder="Not available",document.getElementById("send-notification")&&document.getElementById("send-notification").remove(),window.gameTimer&&window.gameTimer.updateConversationPoints(0))}resetTimer(){this.startTime=new Date(2025,1,5).getTime(),this.missionStartTime=new Date().getTime(),this.events.forEach(t=>t.triggered=!1),this.clearChatHistory(),this.sendCount=8,this.updateSendButton(),this.backgroundUpdates.find(t=>t.hours===0)&&this.updateBackgroundImages(0)}getTotalQuestions(){return this.initialQuestionsPerPerson+this.additionalQuestions}updateCharacterStatus(e,t){this.characterStatus[e]=t;const o=document.querySelector(`li[data-user="${e}"]`);if(o&&(o.classList.remove("arrested","hospitalized"),t==="arrested"||t==="hospitalized")){o.classList.add(t);let n=o.querySelector(".status-label");n||(n=document.createElement("span"),n.className="status-label",o.appendChild(n)),n.textContent=t==="arrested"?"Arrested":"In Hospital"}this.currentUser===e&&this.updateChatAreaStyle(t)}updateChatAreaStyle(e){const t=document.querySelector(".chat-area");t&&(t.classList.remove("arrested-chat","hospitalized-chat"),e==="arrested"?t.classList.add("arrested-chat"):e==="hospitalized"&&t.classList.add("hospitalized-chat"))}}window.questioningModal=new E;document.getElementById("questioning").addEventListener("click",()=>{window.questioningModal.show()});function Y(p){window.questioningModal.sendCount+=p,window.questioningModal.updateSendButton()}Y(3);
