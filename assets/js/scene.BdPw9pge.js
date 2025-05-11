import{R as M,V as S,S as A,P as L,W as P,O as w,a as O,b as D,C as z,M as p,c as R,d as q,e as y,B,f as k,D as b,g as j,h as d,T,i as N,j as u,E as $,Q as x}from"./three.DHARaMpq.js";function V(){return console.log("检查THREE.js加载状态"),console.log("THREE对象类型:",typeof T),console.log("THREE版本:",N),console.log("OrbitControls类型:",typeof w),typeof T!="object"?(console.error("THREE.js未正确加载!"),!1):typeof w!="function"?(console.error("OrbitControls未正确加载!"),!1):(console.log("THREE.js和控制组件加载正常"),!0)}class I{constructor(e){this.camera=e,this.enabled=!0,this.deviceOrientation={},this.screenOrientation=0,this.alphaOffset=0,this.onDeviceOrientationChangeEvent=this.onDeviceOrientationChangeEvent.bind(this),this.onScreenOrientationChangeEvent=this.onScreenOrientationChangeEvent.bind(this),this.connect()}onDeviceOrientationChangeEvent(e){this.deviceOrientation=e}onScreenOrientationChangeEvent(){this.screenOrientation=window.orientation||0}connect(){this.onScreenOrientationChangeEvent(),window.addEventListener("orientationchange",this.onScreenOrientationChangeEvent,!1),window.addEventListener("deviceorientation",this.onDeviceOrientationChangeEvent,!1),this.enabled=!0}disconnect(){window.removeEventListener("orientationchange",this.onScreenOrientationChangeEvent,!1),window.removeEventListener("deviceorientation",this.onDeviceOrientationChangeEvent,!1),this.enabled=!1}update(){if(!this.enabled)return;const e=this.deviceOrientation;if(e){const i=e.alpha?u.degToRad(e.alpha)+this.alphaOffset:0,t=e.beta?u.degToRad(e.beta):0,n=e.gamma?u.degToRad(e.gamma):0,a=this.screenOrientation?u.degToRad(this.screenOrientation):0;this.updateCamera(i,t,n,a)}}updateCamera(e,i,t,n){const a=new $,s=new x;a.set(i,e,-t,"YXZ"),s.setFromEuler(a),s.multiply(new x().setFromAxisAngle(new d(0,0,1),n)),s.multiply(new x().setFromAxisAngle(new d(1,0,0),Math.PI/2)),this.camera.quaternion.copy(s)}updateAlphaOffset(){this.deviceOrientation&&this.deviceOrientation.alpha&&(this.alphaOffset=Math.PI/2-u.degToRad(this.deviceOrientation.alpha))}calibrate(){this.updateAlphaOffset()}}class F{constructor(){if(this.markers=[],this.raycaster=new M,this.mouse=new S,this.isMobile=this.checkIfMobile(),this.hasDeviceOrientation=!1,this.controls=null,this.deviceControls=null,console.log("Initializing PanoramaScene... Mobile device:",this.isMobile),!V()){console.error("THREE.js 初始化失败，将在5秒后重试"),setTimeout(()=>this.initialize(),5e3);return}this.initialize()}checkIfMobile(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}initialize(){try{console.log("开始初始化PanoramaScene组件"),this.scene=new A,this.camera=new L(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(0,.03,-.1),this.camera.rotation.set(0,Math.PI,0),this.renderer=new P({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.domElement.style.position="fixed",this.renderer.domElement.style.top="0",this.renderer.domElement.style.left="0",this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.renderer.domElement.style.zIndex="5",this.renderer.domElement.style.display="none";const e=document.querySelector(".background-container");e?(e.appendChild(this.renderer.domElement),console.log("Renderer added to background container")):(document.body.appendChild(this.renderer.domElement),console.error("背景容器未找到，renderer添加到body")),this.initControls(),this.renderer.domElement.addEventListener("wheel",i=>{i.preventDefault()},{passive:!1}),window.addEventListener("resize",this.onWindowResize.bind(this)),this.renderer.domElement.addEventListener("click",this.onMarkerClick.bind(this)),this.createVignette(),this.animate(),console.log("PanoramaScene initialized successfully")}catch(e){console.error("PanoramaScene初始化失败:",e)}}initControls(){this.isMobile?(console.log("移动设备：初始化设备方向控制器"),this.deviceControls=new I(this.camera),this.addDeviceOrientationPermissionButton(),this.controls=new w(this.camera,this.renderer.domElement),this.setupOrbitControls(this.controls),window.DeviceOrientationEvent&&"ontouchstart"in window?console.log("设备支持方向传感器，等待用户授权"):console.log("设备不支持方向传感器，使用备用OrbitControls")):(console.log("桌面设备：初始化轨道控制器"),this.controls=new w(this.camera,this.renderer.domElement),this.setupOrbitControls(this.controls))}setupOrbitControls(e){e.enableZoom=!0,e.zoomSpeed=.5,e.minDistance=.1,e.maxDistance=.3,e.enableDamping=!0,e.dampingFactor=.05,e.rotateSpeed=.5,e.minPolarAngle=Math.PI/3,e.maxPolarAngle=2*Math.PI/3,e.enablePan=!1}addDeviceOrientationPermissionButton(){let e=document.getElementById("gyro-permission-btn");e||(e=document.createElement("button"),e.id="gyro-permission-btn",e.textContent="Enable Gyroscope",e.style.cssText=`
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1000;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 20px;
                padding: 10px 20px;
                font-size: 16px;
                display: none;
            `,document.body.appendChild(e),e.addEventListener("click",()=>{this.requestDeviceOrientationPermission(),e.style.display="none"})),this.isIOSDevice()&&this.getIOSVersion()>=13?e.style.display="block":window.DeviceOrientationEvent&&this.enableDeviceOrientation()}requestDeviceOrientationPermission(){typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"?(console.log("设备方向权限已授予"),this.enableDeviceOrientation()):(console.log("设备方向权限被拒绝"),this.showFallbackMessage())}).catch(e=>{console.error("请求设备方向权限出错:",e),this.showFallbackMessage()}):this.enableDeviceOrientation()}enableDeviceOrientation(){let e,i=!1;const t=()=>{i=!0,clearTimeout(e),window.removeEventListener("deviceorientation",t),console.log("设备方向事件已触发，启用陀螺仪控制"),this.hasDeviceOrientation=!0,this.deviceControls?(this.deviceControls.disconnect(),this.deviceControls.connect(),this.deviceControls.calibrate()):this.deviceControls=new I(this.camera),this.controls&&(this.controls.enabled=!1)};window.addEventListener("deviceorientation",t,{once:!0}),e=setTimeout(()=>{i||(window.removeEventListener("deviceorientation",t),console.log("设备方向事件未触发，使用轨道控制器作为备用"),this.showFallbackMessage(),this.controls&&(this.controls.enabled=!0))},3e3)}showFallbackMessage(){const e=document.createElement("div");e.style.cssText=`
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 1000;
            text-align: center;
            max-width: 80%;
        `,e.textContent="Using touch controls. Drag to look around.",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transition="opacity 0.5s",setTimeout(()=>e.remove(),500)},5e3)}isIOSDevice(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}getIOSVersion(){return/iPhone OS (\d+)_/.test(navigator.userAgent)?parseInt(RegExp.$1,10):0}createVignette(){const e=new O(2,2),i=new D({uniforms:{color:{value:new z(0)},opacity:{value:.5}},vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,fragmentShader:`
                uniform vec3 color;
                uniform float opacity;
                varying vec2 vUv;
                void main() {
                    float dist = distance(vUv, vec2(0.5, 0.5)); // 计算到中心的距离
                    float vignette = smoothstep(0.4, 0.5, dist); // 创建晕影效果
                    gl_FragColor = vec4(color, opacity * (1.0 - vignette)); // 根据距离调整颜色和透明度
                }
            `,transparent:!0});this.vignetteMesh=new p(e,i),this.vignetteMesh.position.z=0,this.scene.add(this.vignetteMesh)}loadPanorama(e){if(console.log("Loading panorama:",e),!e||typeof e!="object"){console.error("Invalid scene data:",e);return}if(e.type==="cube")try{this.renderer.domElement.style.display="block",this.renderer.domElement.style.zIndex="10",console.log("渲染器已设置为可见，z-index:",this.renderer.domElement.style.zIndex);const i=new R,t=[e.images.right,e.images.left,e.images.top,e.images.bottom,e.images.front,e.images.back];console.log("Loading cube textures:",t);const n=i.load(t,()=>{console.log("Cube textures loaded successfully"),this.renderer.domElement.style.display="block"},r=>{console.log("Loading progress:",r.loaded/r.total*100+"%")},r=>{console.error("Error loading cube textures:",r)});this.scene.background=n;const a=new q(500,60,40);a.scale(-1,1,1);const s=new y({envMap:n,side:B}),o=new p(a,s);for(;this.scene.children.length>0;)this.scene.remove(this.scene.children[0]);this.scene.add(o),console.log("全景网格已添加到场景"),this.camera.position.set(0,0,.1),this.controls.reset(),e.sceneName&&this.addEvidenceMarkers(e.sceneName)}catch(i){console.error("Error in loadPanorama:",i)}else console.error("Invalid panorama type:",e.type)}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}animate(){requestAnimationFrame(this.animate.bind(this));const e=Date.now()*.001;this.markers.forEach(i=>{if(i.lookAt(this.camera.position),i.userData.glowEffect){const t=i.userData.glowEffect;t.lookAt(this.camera.position);const n=i.userData.pulseStartTime||0,a=Math.sin((e*2+n)*.5)*.5+.5,s=1+a*.3;t.scale.set(i.scale.x*s,i.scale.y*s,i.scale.z*s),t.material.opacity=.3+a*.2}i.userData.rings&&i.userData.rings.forEach((t,n)=>{t.lookAt(this.camera.position);const a=e+t.userData.offset,s=t.userData.initialScale*(1+a*t.userData.speed%1);t.scale.set(s,s,s),t.material.opacity=.5*(1-a*t.userData.speed%1)})}),this.isMobile&&this.hasDeviceOrientation&&this.deviceControls?this.deviceControls.update():this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera)}switchScene(e){console.log("Switching to panorama scene:",e),this.renderer&&this.renderer.domElement&&(this.renderer.domElement.style.display="block",this.renderer.domElement.style.zIndex="10",console.log("渲染器在场景切换时立即设置为可见, z-index:",this.renderer.domElement.style.zIndex));const i=document.querySelector(".background-image");if(i&&(i.style.opacity="0"),this.loadPanorama(e),e&&e.sceneName?(console.log("Adding evidence markers for scene:",e.sceneName),this.addEvidenceMarkers(e.sceneName)):console.warn("No sceneName provided in sceneData"),this.isMobile&&!this.hasDeviceOrientation){const t=document.getElementById("gyro-permission-btn");t&&(t.style.display="block")}}dispose(){this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}createMarker(e,i){const t=new k(1,32),n=new y({color:16777215,side:b,transparent:!0,opacity:.9}),a=new p(t,n);return a.position.copy(e),a.scale.set(5,5,5),a.lookAt(this.camera.position),a.userData=i,this.scene.add(a),this.markers.push(a),this.addRingEffect(a),this.addPulseEffect(a),a}addRingEffect(e){for(let i=0;i<3;i++){const t=new j(1,1.2,32),n=new y({color:16777215,side:b,transparent:!0,opacity:.5}),a=new p(t,n);a.position.copy(e.position),a.scale.set(e.scale.x,e.scale.y,e.scale.z),a.lookAt(this.camera.position),a.userData={initialScale:e.scale.x,offset:i*2*Math.PI/3,speed:.5},this.scene.add(a),e.userData.rings=e.userData.rings||[],e.userData.rings.push(a)}}addPulseEffect(e){const i=new k(1.2,32),t=new y({color:16777215,transparent:!0,opacity:.5,side:b}),n=new p(i,t);n.position.copy(e.position),n.scale.set(e.scale.x,e.scale.y,e.scale.z),n.lookAt(this.camera.position),this.scene.add(n),e.userData.glowEffect=n,e.userData.pulseStartTime=Math.random()*2e3}onMarkerClick(e){const i=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-i.left)/i.width*2-1,this.mouse.y=-((e.clientY-i.top)/i.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.markers);if(t.length>0){const n=t[0].object;this.showEvidencePopup(n.userData)}}showEvidencePopup(e){var c,E;const i=document.querySelector(".evidence-popup");i&&i.remove();const n=((c=window.evidenceData)==null?void 0:c.en.find(h=>h.name===e.name||h.name===e.name.replace(" (Investigated)","")))||e,a=n.investigated||!1,s=document.createElement("div");s.className="evidence-popup",s.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 30px;
            border-radius: 10px;
            z-index: 1000;
            max-width: 400px;
            text-align: center;
            font-family: Arial, sans-serif;
        `;const o=n.investigationCost||{type:"tech",amount:3},r=!a&&((E=window.detectiveManager)==null?void 0:E.hasEnoughPoints(o.type.toLowerCase(),o.amount));s.innerHTML=`
            <div style="position: relative;">
                <button class="close-popup-btn" style="
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                ">×</button>
                
                <h3 style="margin: 0 0 15px 0; color: #ffffff;">${n.name}</h3>
                <p style="margin: 0 0 20px 0; line-height: 1.5;">${n.description}</p>
                
                ${a?`
                    <div style="
                        background: rgba(186, 169, 44, 0.1);
                        border: 1px solid #baa92c;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 15px 0;
                        text-align: left;
                    ">
                        <h4 style="margin: 0 0 10px 0; color: #baa92c;">Investigation Results</h4>
                        <p style="margin: 0; line-height: 1.5;">${n.detailedInfo}</p>
                        ${n.investigationDetails?`
                            <div style="margin-top: 10px; font-size: 12px; color: #888;">
                                <p>Investigated by: ${n.investigationDetails.investigatedBy}</p>
                                <p>Date: ${new Date(n.investigationDetails.investigatedAt).toLocaleString()}</p>
                                <p>Cost: ${n.investigationDetails.cost.amount} ${n.investigationDetails.cost.type} Points</p>
                            </div>
                        `:""}
                    </div>
                `:`
                    <div style="display: flex; justify-content: center; gap: 10px; margin: 15px 0;">
                        <button class="add-evidence-btn" style="
                            background: #f5f5dc;
                            color: black;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: bold;
                        ">Add to Evidence</button>
                        ${n.investigationCost?`
                        <div style="position: relative;">
                            <button class="investigate-btn" style="
                                background: ${r?"#baa92c":"#666666"};
                                color: white;
                                border: none;
                                padding: 8px 20px;
                                border-radius: 5px;
                                cursor: ${r?"pointer":"not-allowed"};
                                font-weight: bold;
                            ">Investigate</button>
                            <span style="
                                position: absolute;
                                bottom: -15px;
                                left: 50%;
                                transform: translateX(-50%);
                                font-size: 10px;
                                white-space: nowrap;
                                color: ${r?"white":"#ff6666"};
                            ">Cost: ${o.amount} ${o.type==="tech"?"Tech":"Lab"} Points</span>
                        </div>
                        `:""}
                    </div>
                `}
            </div>
        `;const l=s.querySelector(".close-popup-btn");l.onclick=()=>s.remove();const m=h=>{s.contains(h.target)||(s.remove(),document.removeEventListener("click",m))};if(setTimeout(()=>{document.addEventListener("click",m)},0),!a){const h=s.querySelector(".add-evidence-btn");if(h.onclick=()=>{s.remove(),this.addToEvidence(n),this.showNotification("Evidence added: "+n.name),this.animateEvidenceButton()},n.investigationCost){const C=s.querySelector(".investigate-btn");r?C.onclick=()=>{if(!window.detectiveManager){this.showNotification("Detective system not initialized!");return}const f=o.type.toLowerCase();window.detectiveManager.modifyPoints(f,-o.amount);const v={...n,investigated:!0,investigationDetails:{cost:o,investigatedBy:window.detectiveManager.detectives[window.detectiveManager.currentDetective].name,investigatedAt:window.detectiveManager.getFormattedGameTime(),score:n.scoreValue}};this.addToEvidence(v),this.animateEvidenceButton(),window.detectiveManager&&window.detectiveManager.addEvidenceScore(n.scoreValue,n),s.remove(),this.showEvidencePopup(v),this.showNotification(`Investigation completed! Evidence Score: +${n.scoreValue}`)}:C.onclick=()=>{const f=window.detectiveManager.detectives[window.detectiveManager.currentDetective],v=o.type.toLowerCase()==="tech"?f.techPoints:f.labPoints;this.showNotification(`Insufficient points! Required ${o.amount} ${o.type} Points (Current: ${v})`)}}}document.body.appendChild(s)}addToEvidence(e){let i=!1,t=0;if(window.evidenceData&&window.evidenceData.en){for(const n of window.evidenceData.en)if(n.id>t&&(t=n.id),n.name===e.name||n.name===e.name.replace(" (Investigated)","")){i=!0,e.investigated&&(Object.assign(n,{investigated:!0,investigationDetails:e.investigationDetails,detailedInfo:e.detailedInfo}),console.log("Updated existing evidence with investigation results:",n));break}}if(!i&&window.evidenceData&&window.evidenceData.en){const n={id:t+1,name:e.name.replace(" (Investigated)",""),description:e.description,investigated:e.investigated||!1,investigationDetails:e.investigationDetails||null,detailedInfo:e.detailedInfo||null,scene:e.scene||null,investigationCost:e.investigationCost||null};window.evidenceData.en.push(n),console.log("Added new evidence:",n)}window.game&&window.game.evidencePage&&(window.game.evidencePage.setupEvidenceItems(),console.log("Evidence page updated"))}showNotification(e){const i={"点数不足！需要":"Insufficient points! Required","Tech Points (当前:":"Tech Points (Current:","Lab Points (当前:":"Lab Points (Current:","已添加证物:":"Evidence added:","Detective system not initialized!":"Detective system not initialized!"};let t=e;for(const[s,o]of Object.entries(i))t=t.replace(s,o);const n=document.createElement("div");n.className="evidence-notification",n.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 5px;
            z-index: 1001;
            font-size: 14px;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            animation: slideDown 0.5s ease-out forwards;
            text-align: center;
            min-width: 200px;
            max-width: 400px;
        `,n.innerHTML=t;const a=document.createElement("style");a.innerHTML=`
            @keyframes slideDown {
                from { transform: translate(-50%, -100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, 0); }
                to { opacity: 0; transform: translate(-50%, -20px); }
            }
        `,document.head.appendChild(a),document.body.appendChild(n),setTimeout(()=>{n.style.animation="fadeOut 0.5s ease-out forwards",setTimeout(()=>n.remove(),500)},3e3)}animateEvidenceButton(){const e=document.getElementById("evidence");if(!e)return;e.classList.add("evidence-btn-pulse");const i=document.createElement("style");i.innerHTML=`
            .evidence-btn-pulse {
                animation: pulse 0.5s ease-in-out 3;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); box-shadow: 0 0 10px #ffff00; }
                100% { transform: scale(1); }
            }
        `,document.head.appendChild(i),setTimeout(()=>{e.classList.remove("evidence-btn-pulse")},1500)}addEvidenceMarkers(e="livingroom"){const t={livingroom:[{position:new d(60,0,-180),data:{name:"Television",description:"A flat-screen TV in the living room. It doesn't appear to have been used on the day of the incident.",image:"./images/evidence/television.jpg",scene:"livingroom",investigationCost:null,detailedInfo:null,scoreValue:10}},{position:new d(-220,-90,100),data:{name:"Baseball Bat",description:"A baseball bat found in the corner of the living room. There appear to be dark stains on it.",image:"./images/evidence/baseball_bat.jpg",scene:"livingroom",investigationCost:{type:"lab",amount:2},detailedInfo:"Forensic analysis confirms the stains are blood that matches the victim. The pattern of blood spatter is consistent with this being the murder weapon.",scoreValue:35}},{position:new d(60,-100,-180),data:{name:"Texas Hold'em Poker Chips",description:"A set of poker chips scattered on the table, suggesting a recent game.",image:"./images/evidence/poker_chips.jpg",scene:"livingroom",investigationCost:{type:"lab",amount:1},detailedInfo:"Fingerprint analysis identifies prints from John, Linna, and Mark on the chips. Distribution of chips suggests Linna lost the most money during their last game.",scoreValue:20}},{position:new d(-60,-40,180),data:{name:"Various Coffee Cups",description:"Multiple coffee cups of different styles and conditions on the coffee table and kitchen counter.",image:"./images/evidence/coffee_cups.jpg",scene:"livingroom",investigationCost:{type:"tech",amount:2},detailedInfo:"Technical analysis of the cups' wear patterns reveals that Amy's cup is brand new, while all other cups show significant signs of age and use.",scoreValue:25}},{position:new d(130,-100,-50),data:{name:"Mop",description:"A mop that appears to have been recently used, leaning against the wall.",image:"./images/evidence/mop.jpg",scene:"livingroom",investigationCost:{type:"lab",amount:2},detailedInfo:"Fingerprint analysis shows John's prints on the mop handle. Residue on the mop suggests it was used to clean the floor recently.",scoreValue:30}}],markroom:[{position:new d(-120,-38,150),data:{name:"Coffee Cup",description:"A coffee cup with residual coffee stains around the rim.",image:"./images/evidence/coffee_cup.jpg",scene:"markroom",investigationCost:{type:"lab",amount:2},detailedInfo:"No fingerprints detected on the cup rim. Laboratory analysis reveals traces of sleeping pills mixed with the coffee.",scoreValue:30}},{position:new d(80,-110,150),data:{name:"Scattered Files and Packaging",description:"Various documents and packaging bags scattered across the desk and floor.",image:"./images/evidence/files_packaging.jpg",scene:"markroom",investigationCost:{type:"lab",amount:3},detailedInfo:"Chemical analysis of the packaging reveals drug residue called 'Ketamine'.",scoreValue:25}},{position:new d(100,-110,150),data:{name:"Footprint A",description:"A footprint found in his room, as same as the one found in the living room.",image:"./images/evidence/footprint.jpg",scene:"markroom",investigationCost:{type:"lab",amount:1},detailedInfo:"the shoe size doesn't match Mark's foot size.it matches Tom's.",scoreValue:25}},{position:new d(100,-110,50),data:{name:"Footprint B",description:"A footprint found in his room, this one is not found in any other room.",image:"./images/evidence/footprint.jpg",scene:"markroom",investigationCost:{type:"lab",amount:1},detailedInfo:"this footprint doesn't match anyone's foot size, and it is so clean.",scoreValue:25}},{position:new d(200,-120,30),data:{name:"Maintenance Wrench",description:"A wrench possibly used for home repairs, left near the window.",image:"./images/evidence/wrench.jpg",scene:"markroom",investigationCost:{type:"lab",amount:2},detailedInfo:"No blood traces or new fingerprints detected on the wrench. It doesn't appear to be related to the crime.",scoreValue:15}},{position:new d(-80,-60,-160),data:{name:"Leather Shoes in Cabinet",description:"A pair of leather shoes stored in the shoe cabinet.",image:"./images/evidence/leather_shoes.jpg",scene:"markroom",investigationCost:{type:"lab",amount:1},detailedInfo:"The shoe prints match those found at the crime scene, but the shoe size doesn't match anyone's size.",scoreValue:20}}],johnroom:[{position:new d(-30,190,-180),data:{name:"Signature Practice Notebook",description:"A notebook with multiple signatures in different handwriting styles. The name 'Tom' appears frequently on the back pages.",image:"./images/evidence/signature_notebook.jpg",scene:"johnroom",investigationCost:null,detailedInfo:null,scoreValue:15}},{position:new d(180,-50,-30),data:{name:"Shredded Paper Fragments",description:"Paper fragments from a paper shredder. They might contain important information if reconstructed.",image:"./images/evidence/shredded_paper.jpg",scene:"johnroom",investigationCost:{type:"tech",amount:3},detailedInfo:"The reconstructed fragments reveal two separate rental agreements with different signatures and terms.",scoreValue:25}},{position:new d(60,-130,140),data:{name:"Korean Cosmetics and Love Letter",description:"Female Korean cosmetic products and a love letter. Strange to find these items in John's room.",image:"./images/evidence/korean_cosmetics.jpg",scene:"johnroom",investigationCost:null,detailedInfo:null,scoreValue:15}},{position:new d(-180,-100,100),data:{name:"Dry Cleaning Clothes",description:"A dry cleaning bag with a pair of clothes inside.",image:"./images/evidence/prop_shoes.jpg",scene:"johnroom",investigationCost:{type:"lab",amount:3},detailedInfo:"The clothes are from a theater. DNA analysis failed to find any matches.",scoreValue:30}}],amyroom:[{position:new d(120,-30,-60),data:{name:"Non-Computer Science Paper",description:"Academic papers not related to computer science, with drafts for a ghostwriting service.",image:"./images/evidence/academic_paper.jpg",scene:"amyroom",investigationCost:null,detailedInfo:null,scoreValue:15}},{position:new d(30,-40,-160),data:{name:"Wedding Ring and Immigration Documents",description:"A wedding ring next to immigration documents in a drawer.Computer analysis reveals a timeline for marriage-based green card application. Documents suggest the marriage may be arranged for immigration purposes.",image:"./images/evidence/wedding_ring.jpg",scene:"amyroom",investigationCost:null,detailedInfo:null,scoreValue:15}},{position:new d(-100,-80,-170),data:{name:"School project group Photo",description:"A photo of Amy and Neal both in the same frame, posing in front of a whiteboard, the time is exactly the same as the time of the incident.",image:"./images/evidence/whiteboard_photo.jpg",scene:"amyroom",investigationCost:{type:"tech",amount:3},detailedInfo:"Technical analysis reveals the reflections in the image have been photoshopped. A cafeteria menu is partially visible in the corner, suggesting the location was staged.",scoreValue:30}},{position:new d(60,-80,140),data:{name:"Baseball Glove",description:"A well-used baseball glove that seems out of place in Amy's belongings.",image:"./images/evidence/baseball_glove.jpg",scene:"amyroom",investigationCost:{type:"lab",amount:3},detailedInfo:"The most recent fingerprints on the glove belong to Linna, not Amy, indicating Linna handled the glove recently.",scoreValue:25}}],linnaroom:[{position:new d(-60,100,120),data:{name:"Expensive clothes and bags",description:"Expensive clothes and bags, some of clothes are revealing.",image:"./images/evidence/revealing_clothes.jpg",scene:"linnaroom",investigationCost:null,detailedInfo:null,scoreValue:10}},{position:new d(160,-80,130),data:{name:"Plane Ticket to Singapore",description:"A return flight ticket to Singapore scheduled for three days from now.",image:"./images/evidence/plane_ticket.jpg",scene:"linnaroom",investigationCost:null,detailedInfo:null,scoreValue:15}},{position:new d(-150,-50,-120),data:{name:"A unopened safe",description:"A safe that is not opened.",image:"./images/evidence/cash_drugs.jpg",scene:"linnaroom",investigationCost:{type:"tech",amount:3},detailedInfo:"The safe contains a lot of cash money and Ketamine.",scoreValue:35}},{position:new d(-150,-60,100),data:{name:"Deleted chat history with Mark",description:"A partially deleted chat history between Mark and Linna, requires cloud recovery.",image:"./images/evidence/deleted_chat.jpg",scene:"linnaroom",investigationCost:{type:"tech",amount:4},detailedInfo:`Recovered chat logs reveal Mark's threats to Linna:

'Listen carefully. If I report your drug dealing activities to the school, you won't be able to graduate next month. You know Amy's business right? As long as I call the school, she will be expelled. Think about it.'

[Many messages have been deleted]`,scoreValue:25}},{position:new d(150,30,-100),data:{name:"Concert Group Photo",description:"A group photo taken at a concert, showing Linna, Join, and Mark",image:"./images/evidence/concert_photo.jpg",scene:"linnaroom",investigationCost:{type:"tech",amount:2},detailedInfo:"The photo was taken one year ago, showing Linna, Join, and Mark together at a concert. The photo was taken by Tom.",scoreValue:20}}]}[e]||[];this.markers.forEach(n=>{n.userData.glowEffect&&this.scene.remove(n.userData.glowEffect),this.scene.remove(n)}),this.markers=[],t.forEach(n=>{this.createMarker(n.position,n.data)}),console.log(`Added ${t.length} evidence markers in ${e}`)}}document.addEventListener("DOMContentLoaded",function(){console.log("DOM loaded, initializing PanoramaScene..."),setTimeout(function(){window.panoramaScene=new F,console.log("PanoramaScene created as global instance")},500)});document.addEventListener("DOMContentLoaded",()=>{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768){console.log("Mobile device detected, skipping instructions");const t=document.querySelector(".background-image");if(t){t.style.opacity="0",t.style.backgroundImage="url('./images/scene0.png')";const n=new Image;n.onload=()=>{t.style.opacity="1",t.style.transition="opacity 0.3s ease",setTimeout(()=>{if(window.gameTimer){window.gameTimer.hasCompletedStickers=!0,window.gameTimer.missionStartTime=new Date().getTime(),window.gameTimer.initTimer(),window.gameTimer.isRunning=!0,document.querySelectorAll("#timer, #mission, #mission-timer").forEach(r=>{r&&(r.style.color="#4CAF50",r.style.textShadow="0 0 10px rgba(76, 175, 80, 0.7)")}),document.querySelectorAll(".timer-label").forEach(r=>{r&&(r.style.color="#4CAF50")});const o=setInterval(()=>{window.panoramaScene&&(clearInterval(o),console.log("全景场景实例已就绪，切换到Mark房间"),window.gameTimer.switchToScene(window.gameTimer.SCENE_MARK_ROOM))},100);setTimeout(()=>{clearInterval(o),console.log("全景场景加载超时，使用默认场景")},5e3)}},1e3)},n.src="./images/scene0.png"}return}console.log("Desktop device detected - creating stickers");const e=document.querySelector(".background-image");if(e){e.style.opacity="0",e.style.backgroundImage="url('./images/scene0.png')";const t=new Image;t.onload=()=>{e.style.opacity="1",e.style.transition="opacity 0.3s ease",i()},t.src="./images/scene0.png"}else i();function i(){if(document.querySelectorAll("#timer, #mission, #mission-timer").forEach(r=>{r&&(r.style.color="#888888")}),document.querySelector(".sticker-container")){console.log("Sticker container already exists, skipping creation");return}const n=document.createElement("div");n.className="sticker-container",n.style.position="fixed",n.style.width="100%",n.style.height="100vh",n.style.zIndex="200",n.style.pointerEvents="none",n.style.opacity="0",document.body.appendChild(n),requestAnimationFrame(()=>{requestAnimationFrame(()=>{n.style.transition="opacity 0.3s ease",n.style.opacity="1"})}),console.log("Creating initial stickers, count:",5),[{text:"YOU!: Here is who you are and what's your special skill, you probably know some of you already.",position:{top:"10%",left:"10%"},rotation:"-3deg",color:"rgba(252, 246, 231, 0.92)",number:1},{text:"TIME!: Time is everything, solve it before nothing too late! and Check your EVENTS in bottom right corner!",position:{top:"10%",left:"70%"},rotation:"2deg",color:"rgba(250, 247, 235, 0.92)",number:2},{text:"POINTS!: You will get points for good clue you find, Manage them nicely.",position:{top:"60%",left:"12%"},rotation:"-2deg",color:"rgba(248, 245, 235, 0.92)",number:4},{text:"SCENE!: No detective is complete without a scene, here is the scenes where you need to find the clues.",position:{top:"40%",left:"80%"},rotation:"4deg",color:"rgba(255, 250, 240, 0.92)",number:3},{text:"BULABULA! The first 3 buttons are the tools you need to keep working on, Hit the big red button when really finished.",position:{top:"65%",left:"60%"},rotation:"1deg",color:"rgba(251, 248, 237, 0.92)",number:5}].forEach(r=>{const l=document.createElement("div");l.className="sticker",l.style.position="absolute",l.style.width="230px",l.style.height="230px",l.style.backgroundColor=r.color,l.style.border="1px solid rgba(0,0,0,0.08)",l.style.borderRadius="2px",l.style.boxShadow=`
                0 1px 4px rgba(0,0,0,0.15),
                0 0 20px rgba(0,0,0,0.08),
                2px 2px 8px rgba(0,0,0,0.08)
            `,l.style.padding="15px",l.style.textAlign="center",l.style.display="flex",l.style.flexDirection="column",l.style.justifyContent="space-between",l.style.alignItems="center",l.style.top=r.position.top,l.style.left=r.position.left,l.style.transform=`rotate(${r.rotation})`,l.style.transition="all 0.3s ease",l.style.cursor="default",l.style.zIndex="200",l.style.pointerEvents="auto";const m=document.createElement("div");m.textContent=r.number,m.style.fontSize="48px",m.style.fontWeight="bold",m.style.color="#333",m.style.position="absolute",m.style.top="10px",m.style.left="10px",m.style.textShadow="2px 2px 4px rgba(0,0,0,0.1)",l.appendChild(m);const c=document.createElement("p");c.textContent=r.text,c.style.margin="0",c.style.fontSize="18px",c.style.lineHeight="1.4",c.style.color="#555",c.style.paddingLeft="20px",c.style.paddingTop="10px",c.style.textAlign="left",l.appendChild(c),n.appendChild(l),l.onmouseover=()=>{l.style.boxShadow=`
                    0 8px 15px rgba(0,0,0,0.2),
                    0 0 30px rgba(0,0,0,0.1),
                    4px 4px 12px rgba(0,0,0,0.1)
                `,l.style.transform=`rotate(${r.rotation}) scale(1.05)`,l.style.zIndex="201"},l.onmouseout=()=>{l.style.boxShadow=`
                    0 1px 4px rgba(0,0,0,0.15),
                    0 0 20px rgba(0,0,0,0.08),
                    2px 2px 8px rgba(0,0,0,0.08)
                `,l.style.transform=`rotate(${r.rotation})`,l.style.zIndex="200"}});const o=document.createElement("button");o.className="ready-button",o.textContent="I am ready to play",o.style.position="fixed",o.style.bottom="10%",o.style.left="49%",o.style.transform="translateX(-50%)",o.style.padding="15px 30px",o.style.fontSize="18px",o.style.fontWeight="bold",o.style.backgroundColor="#4CAF50",o.style.color="white",o.style.border="2px solid white",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.transition="all 0.3s ease",o.style.zIndex="200",o.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)",o.style.pointerEvents="auto",o.onmouseover=()=>{o.style.backgroundColor="#45a049",o.style.transform="translateX(-50%) scale(1.05)",o.style.boxShadow="0 6px 20px rgba(0,0,0,0.3)"},o.onmouseout=()=>{o.style.backgroundColor="#4CAF50",o.style.transform="translateX(-50%) scale(1)",o.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"},o.addEventListener("click",()=>{console.log("Ready button clicked - starting game"),o.style.transition="all 0.3s ease",o.style.transform="translateX(-50%) translateY(100px)",o.style.opacity="0",setTimeout(()=>{if(o.remove(),n.remove(),window.gameTimer){console.log("Setting gameTimer properties"),window.gameTimer.hasCompletedStickers=!0,window.gameTimer.missionStartTime=new Date().getTime(),window.gameTimer.initTimer(),window.gameTimer.isRunning=!0;const r=document.querySelector(".background-container");r&&(r.style.zIndex="-999"),document.querySelectorAll("#timer, #mission, #mission-timer").forEach(c=>{c&&(c.style.color="#4CAF50",c.style.textShadow="0 0 10px rgba(76, 175, 80, 0.7)")}),document.querySelectorAll(".timer-label").forEach(c=>{c&&(c.style.color="#4CAF50")}),window.gameTimer.switchToScene(window.gameTimer.SCENE_MARK_ROOM),console.log("Timer started and switched to scene 3")}else console.error("gameTimer is not available!")},300)}),n.appendChild(o)}});class _{constructor(e){console.log("EventManager initialized"),this.gameTimer=e,this.amySuicideTriggered=!1,this.policeReinforcementTriggered=!1,this.events=[{hours:.1,name:"Police call from John",description:"It was Sunday, and we received a police call in the evening. <span class='bold'>The caller was John, and the victim was Mark.</span> John got home at 5 PM, found Mark dead in the apartment with clear signs of blunt-force trauma to the head. and further autopsy results will take some time. All the other residents claimed they were out that day, yet investigators found obvious men's shoe prints at the scene—even though the house rules require everyone to take off their shoes upon entering.This is a big case,<span class='bold'>you have at most 40(hours) minutes to understand everything about the case. When you have completed the investigation, the red button in the lower right corner will be the key to becoming a famous detective.</span>",triggered:!1,read:!1,image:"./images/events/police_call.gif",triggerTime:null},{hours:1,name:"Preliminary autopsy results",description:" <span class='bold'>This body is believed to have died between 12 and 3 PM</span>, there is a blunt force trauma wound on the head, No signs of struggle or combat, no foreign DNA detected. Toxicological effects are suspected, requiring further examination.",triggered:!1,read:!1,image:"./images/events/autopsy.gif"},{hours:3,name:"Witness Report",description:"The neighbor said that in the noon, he heard a loud noise from the apartment, but he didn't see anyone. he is a friend of Tom and You can talk to him or any other people in the building. Remember to ask with <span class='bold'>convincing evidence</span> or they might not tell you the truth.",triggered:!1,read:!1,image:"./images/events/witness.gif"},{hours:12,name:"Pressure from your superior",description:"You have 12 hours <span class='bold'>(12 minutes)</span> to make progress on the case <span class='bold'>enough Conviction Evidence</span>, or your access to the lab and technology will be reduced.",triggered:!1,read:!1,image:"./images/events/pressure.gif"},{hours:15,name:"Second Autopsy Report",description:"<span class='bold'>After further examination, the toxicology report reveals a complex chemical interaction in the victim's system.</span> Three substances were found: Ketamine, caffeine from coffee, and sleeping pills. While Ketamine mixed with coffee typically causes increased heart rate and heightened stimulation, the presence of sleeping pills created a dangerous chemical reaction. This combination led to unconsciousness and shock. <span style='color: #4CAF50; font-weight: bold;'>[Reward: +5 Lab Points]</span>",triggered:!1,read:!1,image:"./images/events/autopsy2.gif",onTrigger:()=>{const i=document.getElementById("lab-points");if(i){const t=parseInt(i.textContent)||0;i.textContent=t+5}}},{hours:8,name:"Linna Arrested!",description:"The police have arrested Linna for drug trafficking after discovering evidence in the chat logs. While she's still willing to talk to you, her attitude has become notably hostile and defensive. <span class='bold'>You have 10 hours to present conclusive evidence</span> proving who the real killer is, or Linna will be formally charged with both drug trafficking and murder. <span class='bold'>Time is running out</span> - you must find the truth before an innocent person is wrongly convicted. <span style='color: #2196F3; font-weight: bold;'>[Bonus: +4 Chat Attempts]</span>",triggered:!1,read:!1,image:"./images/events/arrested.gif",onTrigger:()=>{window.questioningModal&&(window.questioningModal.sendCount+=4,window.questioningModal.updateSendButton())}},{hours:18,name:"Amy's Suicide Note",description:"Amy overdosed on sleeping pills and is currently being treated at the hospital. She left behind a half-written confession. In it, she admitted to drugging Mark in the morning because he was blackmailing her with ghostwritten materials. She believed he passed out due to the drug's effects, fell to the ground, and died from the impact—leading her to attempt suicide. She also confessed that she never truly loved her boyfriend and only stayed with him for a green card. Overwhelmed by immense pressure, she contemplated ending her life.",triggered:!1,read:!1,image:"./images/events/suicide_note.gif"},{hours:24,name:"New Pressure",description:"Your superior sees Amy's suicide attempt as an opportunity to close the case and orders you to start writing the Conclusion for the final case report. <span class='bold'>You have 10 hours left to submit it—once time is up, Good thing is you can talk to your suspects more.</span> <span style='color: #2196F3; font-weight: bold;'>[Bonus: +10 Chat Attempts]</span>",triggered:!1,read:!1,image:"./images/events/final_pressure.gif",onTrigger:()=>{window.questioningModal&&(window.questioningModal.sendCount+=10,window.questioningModal.updateSendButton())}},{hours:34,name:"Time to end the game",description:"You have 10 hours<span class='bold'>(10 minutes)</span> left to submit it—once time is up, the game will automatically end. <span class='bold'>Try to describe the whole story in the conclusion and the reason.</span>",triggered:!1,read:!1,image:"./images/events/end_game.gif"}],this.policeReinforcementEvent={hours:null,name:"Police Reinforcement Arrived",description:"Due to your thorough investigation of all rooms, the police department has recognized the complexity of the case and sent additional personnel. <span class='bold'>The Lab and Tech points have been increased</span>, providing more resources and manpower to help solve this case. This will significantly boost our investigation capabilities. <span style='color: #4CAF50; font-weight: bold;'>[Reward: +5 Lab Points, +5 Tech Points]</span>",triggered:!1,read:!1,image:"./images/events/police_reinforcement.gif",triggerTime:null},this.eventsModal=null,this.lastTriggeredEvent=null,this.imageCache=new Map,this.preloadImages()}preloadImages(){["./images/events/police_call.gif","./images/events/autopsy.gif","./images/events/witness.gif","./images/events/pressure.gif","./images/events/autopsy2.gif","./images/events/arrested.gif"].forEach(i=>{const t=new Image;t.onload=()=>{this.imageCache.set(i,t)},t.src=i})}optimizedImageDisplay(e,i){if(this.imageCache.has(e)){const t=this.imageCache.get(e);i.innerHTML="",i.appendChild(t.cloneNode())}else{const t=new Image;t.onload=()=>{this.imageCache.set(e,t),i.innerHTML="",i.appendChild(t.cloneNode())},t.src=e}}checkAmyEvidence(){return!window.evidenceData||!window.evidenceData.en?!1:window.evidenceData.en.filter(i=>i.scene==="amyroom"&&i.investigated).length>=3}checkAllRoomsInvestigated(){if(!window.game||!window.game.evidencePage)return!1;const e=document.querySelector(".evidence-list");if(!e)return!1;const i=new Set;e.querySelectorAll(".evidence-item").forEach(a=>{const s=parseInt(a.dataset.id),o=window.evidenceData.en.find(r=>r.id===s);o&&o.investigated&&i.add(o.scene)});const n=["amyroom","johnroom","linnaroom","markroom"];for(const a of n)if(!i.has(a))return!1;return!0}checkEvents(e){var a;if(!this.events){console.error("Events array is not initialized");return}const i=e/(1e3*60*60);let t=!1,n=null;if(!this.policeReinforcementTriggered&&this.checkAllRoomsInvestigated()&&!this.policeReinforcementEvent.triggered){this.policeReinforcementEvent.triggered=!0,this.policeReinforcementEvent.read=!1,this.policeReinforcementTriggered=!0,t=!0,this.lastTriggeredEvent=this.policeReinforcementEvent,n=this.policeReinforcementEvent;const s=document.getElementById("timer");this.policeReinforcementEvent.triggerTime=s?s.textContent:"00:00:00";const o=document.getElementById("lab-points"),r=document.getElementById("tech-points");if(o){const l=parseInt(o.textContent)||0;o.textContent=l+5}if(r){const l=parseInt(r.textContent)||0;r.textContent=l+5}this.events.push(this.policeReinforcementEvent)}if(!this.amySuicideTriggered&&this.checkAmyEvidence()){const s=this.events.find(o=>o.name==="Amy's Suicide Note"&&!o.triggered);if(s){s.triggered=!0,s.read=!1,this.amySuicideTriggered=!0,t=!0,this.lastTriggeredEvent=s,n=s;const o=document.getElementById("timer");s.triggerTime=o?o.textContent:"00:00:00",window.questioningModal&&window.questioningModal.updateCharacterStatus("Amy","hospitalized")}}if(!this.events.find(s=>s.name==="Linna Arrested!").triggered&&((a=window.evidenceData)==null?void 0:a.en.find(o=>o.name==="Deleted chat history with Mark"&&o.investigated===!0))){const o=this.events.find(r=>r.name==="Linna Arrested!");if(o){o.triggered=!0,o.read=!1,t=!0,this.lastTriggeredEvent=o,n=o;const r=document.getElementById("timer");o.triggerTime=r?r.textContent:"00:00:00",window.questioningModal&&window.questioningModal.updateCharacterStatus("Linna","arrested"),o.onTrigger&&o.onTrigger()}}this.events.forEach(s=>{if(!s.triggered&&s.hours&&i>=s.hours){s.triggered=!0,s.read=!1,t=!0,this.lastTriggeredEvent=s,n=s;const o=document.getElementById("timer");s.triggerTime=o?o.textContent:"00:00:00",s.name==="Linna Arrested!"&&window.questioningModal&&window.questioningModal.updateCharacterStatus("Linna","arrested"),s.onTrigger&&s.onTrigger()}}),this.updateEventNotification(),t&&n&&this.showEvents(n)}updateEventNotification(){try{const e=this.events.filter(n=>n.triggered&&!n.read).length,i=document.getElementById("events");if(!i){console.error("Events button not found");return}let t=document.getElementById("event-notification");e>0?(t||(t=document.createElement("div"),t.id="event-notification",t.style.position="absolute",t.style.top="-8px",t.style.right="-5px",t.style.background="red",t.style.color="white",t.style.borderRadius="50%",t.style.width="30px",t.style.height="30px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.fontSize="14px",t.style.fontWeight="bold",i.appendChild(t)),t.textContent=e):t&&t.remove()}catch(e){console.error("Error updating event notification:",e)}}showEvents(e=null){try{console.log("Showing events modal"),this.eventsModal||(this.eventsModal=document.createElement("div"),this.eventsModal.id="events-modal",this.eventsModal.className="modal",this.eventsModal.innerHTML=`
                    <div class="modal-content" style="background-color: #1a1a1a !important; color: #ffffff !important; max-height: 90vh; overflow: hidden;">
                        <div class="modal-header">
                            <h2>Events</h2>
                            <span class="close">&times;</span>
                        </div>
                        <div class="modal-body" style="max-height: calc(90vh - 60px); overflow-y: auto;" translate="yes" lang="en">
                            <div class="events-list"></div>
                        </div>
                    </div>
                `,document.body.appendChild(this.eventsModal),this.eventsModal.querySelector(".close").addEventListener("click",()=>{this.eventsModal.style.display="none"}),window.addEventListener("click",t=>{t.target===this.eventsModal&&(this.eventsModal.style.display="none")}),this.eventsList=this.eventsModal.querySelector(".events-list")),this.eventsList.innerHTML="";const i=this.events.filter(t=>t.triggered);if(i.length===0?this.eventsList.innerHTML='<div class="event-item">No events yet.</div>':i.forEach(t=>{const n=document.createElement("div");n.className=`event-item ${t.read?"":"unread"}`;const a=t.image||"./images/events/placeholder.gif",s=e&&e===t||this.lastTriggeredEvent&&this.lastTriggeredEvent===t;n.innerHTML=`
                        <div class="event-header" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex-grow: 1;" translate="yes" lang="en">
                                <span class="event-name">${t.name}</span>
                                <span class="event-time">Time: ${t.triggerTime||"00:00:00"}</span>
                            </div>
                            <button class="toggle-description" style="pointer-events: none;">${s?"▲":"▼"}</button>
                        </div>
                        <div class="event-description" style="display: ${s?"flex":"none"}; background-color: rgba(50, 50, 50, 0.5) !important; flex-direction: row; flex-wrap: wrap;">
                            <div class="event-image-container" style="width: 40%; flex-shrink: 0; margin-right: 15px; margin-bottom: 10px;"></div>
                            <div class="event-text" style="flex: 1; min-width: 300px;" translate="yes" lang="en">
                                ${t.description}
                            </div>
                        </div>
                    `;const o=n.querySelector(".event-image-container");this.optimizedImageDisplay(a,o),n.querySelector(".event-header").addEventListener("click",()=>{const l=n.querySelector(".event-description"),m=n.querySelector(".toggle-description");l.style.display=l.style.display==="none"?"flex":"none",m.textContent=m.textContent==="▼"?"▲":"▼",t.read=!0,n.classList.remove("unread"),this.updateEventNotification()}),this.eventsList.appendChild(n),e&&e===t&&(t.read=!0,n.classList.remove("unread"),this.updateEventNotification())}),this.eventsModal.style.display="block",e){const t=this.eventsList.querySelectorAll(".event-item"),n=i.findIndex(a=>a===e);n>=0&&t[n]&&t[n].scrollIntoView({behavior:"smooth",block:"start"})}}catch(i){console.error("Error showing events:",i);const t=document.getElementById("modal");if(t){const n=document.getElementById("modal-title"),a=document.getElementById("modal-body");if(n&&a){n.textContent="Events";let s='<div class="events-container" style="max-height: 90vh; overflow-y: auto;">';const o=this.events.filter(r=>r.triggered);o.length===0?s+='<div class="event-item">No events yet.</div>':o.forEach(r=>{const l=r.image||"./images/events/placeholder.gif";s+=`
                                <div class="event-item ${r.read?"":"unread"}" style="background-color: #2a2a2a; color: #ffffff;">
                                    <h3>${r.name}</h3>
                                    <div class="event-description" style="background-color: rgba(50, 50, 50, 0.5); display: flex; flex-direction: row; flex-wrap: wrap;">
                                        <div class="event-image-container" style="width: 70%; flex-shrink: 0; margin-right: 15px; margin-bottom: 10px;">
                                            <img src="${l}" alt="${r.name}" style="width: 100%; height: auto; border-radius: 5px; display: block;">
                                        </div>
                                        <div class="event-text" style="flex: 1; min-width: 200px;">
                                            ${r.description}
                                        </div>
                                    </div>
                                </div>
                            `,r.read=!0}),s+="</div>",a.innerHTML=s,t.style.display="block",this.updateEventNotification()}}else alert("Events feature is currently unavailable. Please try again later.")}}addEventToList(e){if(!this.eventsModal||!this.eventsList)return;const i=document.createElement("div");i.className=`event-item ${e.read?"":"unread"}`;const t=e.image||"./images/events/placeholder.gif",n=e===this.lastTriggeredEvent;i.innerHTML=`
            <div class="event-header" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex-grow: 1;" translate="yes" lang="en">
                    <span class="event-name">${e.name}</span>
                    <span class="event-time">Time: ${e.triggerTime||"00:00:00"}</span>
                </div>
                <button class="toggle-description" style="pointer-events: none;">${n?"▲":"▼"}</button>
            </div>
            <div class="event-description" style="display: ${n?"flex":"none"}; background-color: rgba(50, 50, 50, 0.5) !important; flex-direction: row; flex-wrap: wrap;">
                <div class="event-image-container" style="width: 40%; flex-shrink: 0; margin-right: 15px; margin-bottom: 10px;"></div>
                <div class="event-text" style="flex: 1; min-width: 300px;" translate="yes" lang="en">
                    ${e.description}
                </div>
            </div>
        `;const a=i.querySelector(".event-image-container");this.optimizedImageDisplay(t,a),i.querySelector(".event-header").addEventListener("click",()=>{const o=i.querySelector(".event-description"),r=i.querySelector(".toggle-description");o.style.display=o.style.display==="none"?"flex":"none",r.textContent=r.textContent==="▼"?"▲":"▼",e.read=!0,i.classList.remove("unread"),this.updateEventNotification()}),this.eventsList.appendChild(i),n&&i.scrollIntoView({behavior:"smooth",block:"start"})}}window.EventManager=_;document.addEventListener("DOMContentLoaded",()=>{console.log("EventManager script loaded");const g=document.createElement("style");g.textContent=`
        #events-modal.modal {
            z-index: 998 !important;
        }
        
        .event-item {
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            background-color: #2a2a2a !important;
            color: #ffffff !important;
            transition: all 0.3s ease;
        }
        
        .event-item.unread {
            background-color: rgba(100, 90, 0, 0.3) !important;
            border-left: 4px solid #ffeb3b;
        }
        
        .event-name {
            font-weight: bold;
            display: block;
            color: #ffffff !important;
        }
        
        .event-time {
            font-size: 0.85em;
            color: #aaaaaa !important;
            display: block;
            margin-top: 5px;
        }
        
        .event-description {
            margin-top: 10px;
            padding: 10px;
            background-color: rgba(50, 50, 50, 0.5) !important;
            border-radius: 5px;
            font-size: 0.95em;
            line-height: 1.5;
            color: #ffffff !important;
        }
        
        .event-image-container {
            position: relative;
            width: 40% !important;
            overflow: hidden;
            border-radius: 5px;
        }
        
        .event-image-container img {
            width: 111.11% !important; /* 使图片比容器宽10% */
            height: auto;
            display: block;
            margin-right: -11.11%; /* 负边距确保右侧被裁剪 */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .event-image-container img:hover {
            transform: scale(1.02);
        }
        
        .event-text {
            flex: 1;
            min-width: 300px;
            padding-left: 15px;
        }
        
        .bold {
            font-weight: bold;
        }
        
        /* 确保模态内容始终使用深色背景 */
        #events-modal .modal-content {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
            max-width: 90%;
            margin: 30px auto;
        }
        
        /* 自定义滚动条样式 */
        .modal-body::-webkit-scrollbar {
            width: 8px;
        }
        
        .modal-body::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        
        .modal-body::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }
        
        .modal-body::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
        
        /* 响应式布局 */
        @media (max-width: 768px) {
            .event-description {
                flex-direction: column !important;
                padding: 10px 0 !important;
                width: 100% !important;
                overflow: hidden !important;
            }
            
            .event-image-container {
                width: 100% !important;
                margin-right: 0 !important;
                margin-bottom: 15px !important;
                overflow: hidden !important;
            }
            
            .event-image-container img {
                width: 100% !important;
                margin-right: 0 !important;
            }
            
            .event-text {
                width: 100% !important;
                padding-left: 0;
                padding-right: 10px;
            }
            
            #events-modal .modal-content {
                max-width: 95%;
                max-height: 90vh !important;
                margin: 15px auto;
                overflow-x: hidden !important;
            }
            
            .modal-body {
                overflow-x: hidden !important;
            }
            
            .events-list {
                overflow-x: hidden !important;
            }
            
            .event-item {
                overflow-x: hidden !important;
                width: 100% !important;
                padding: 10px 5px !important;
            }
        }
    `,document.head.appendChild(g);const e=document.getElementById("events");e&&window.gameTimer&&window.gameTimer.eventManager?e.addEventListener("click",()=>{console.log("Events button clicked"),window.gameTimer.eventManager.showEvents()}):console.error("Events button or gameTimer not initialized yet")});
