import { useEffect, useRef, useState } from 'react';
import { Rotate3D } from 'lucide-react';
import { ToothIcon } from './Shared';
export default function ToothCanvas() {
 const host=useRef<HTMLDivElement>(null); const [failed,setFailed]=useState(false);
 useEffect(()=>{let disposed=false;let cleanup=()=>{};
 (async()=>{try {
 const THREE=await import('three');const {RoomEnvironment}=await import('three/examples/jsm/environments/RoomEnvironment.js');if(disposed||!host.current)return;
 const el=host.current;const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;el.appendChild(renderer.domElement);
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,.05,6.4);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;
 const shape=new THREE.Shape();shape.moveTo(-.84,.72);shape.bezierCurveTo(-1.15,1.28,-.85,1.59,-.42,1.51);shape.bezierCurveTo(-.14,1.48,-.09,1.34,0,1.36);shape.bezierCurveTo(.12,1.39,.24,1.59,.64,1.48);shape.bezierCurveTo(1.04,1.38,1.08,1.03,.87,.57);shape.bezierCurveTo(.71,.2,.68,-.12,.58,-.69);shape.bezierCurveTo(.5,-1.22,.31,-1.55,.17,-1.34);shape.bezierCurveTo(.03,-1.12,.16,-.47,-.05,-.42);shape.bezierCurveTo(-.29,-.4,-.27,-1.15,-.48,-1.33);shape.bezierCurveTo(-.7,-1.51,-.75,-.92,-.78,-.6);shape.bezierCurveTo(-.81,-.09,-.62,.21,-.84,.72);
 const geo=new THREE.ExtrudeGeometry(shape,{depth:.48,bevelEnabled:true,bevelSegments:12,steps:1,bevelSize:.21,bevelThickness:.23,curveSegments:48});geo.center();geo.computeVertexNormals();
 const material=new THREE.MeshPhysicalMaterial({color:'#c5dcea',metalness:.68,roughness:.18,clearcoat:1,clearcoatRoughness:.09,envMapIntensity:1.65});const tooth=new THREE.Mesh(geo,material);scene.add(tooth);tooth.rotation.set(-.12,-.25,-.1);
 const key=new THREE.DirectionalLight('#ffffff',5);key.position.set(-3,4,4);scene.add(key);const rim=new THREE.DirectionalLight('#76c6ff',6);rim.position.set(3,1,-2);scene.add(rim);scene.add(new THREE.AmbientLight('#b1dfff',.8));
 let width=0,height=0;const resize=()=>{width=el.clientWidth;height=el.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix()};resize();const observer=new ResizeObserver(resize);observer.observe(el);
 let tx=-.25,ty=-.12,dragging=false,px=0,py=0;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const move=(e:PointerEvent)=>{if(dragging){tx+=(e.clientX-px)*.012;ty+=(e.clientY-py)*.008;px=e.clientX;py=e.clientY}else{const b=el.getBoundingClientRect();tx=(e.clientX-b.left)/b.width*.9-.7;ty=(e.clientY-b.top)/b.height*.4-.3}};const down=(e:PointerEvent)=>{dragging=true;px=e.clientX;py=e.clientY;el.setPointerCapture(e.pointerId)};const up=()=>{dragging=false};const leave=()=>{if(!dragging){tx=-.25;ty=-.12}};const keydown=(e:KeyboardEvent)=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();tx+=e.key==='ArrowLeft'?-.2:e.key==='ArrowRight'?.2:0;ty+=e.key==='ArrowUp'?-.15:e.key==='ArrowDown'?.15:0}};
 el.addEventListener('pointermove',move);el.addEventListener('pointerdown',down);el.addEventListener('pointerup',up);el.addEventListener('pointerleave',leave);el.addEventListener('keydown',keydown);
 let frame=0;const start=performance.now();const animate=()=>{if(disposed)return;const t=(performance.now()-start)*.001;tooth.rotation.y+=(tx-tooth.rotation.y)*.055;tooth.rotation.x+=(ty-tooth.rotation.x)*.055;tooth.position.y=reduced?0:Math.sin(t*.8)*.055;renderer.render(scene,camera);frame=requestAnimationFrame(animate)};animate();
 cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',up);el.removeEventListener('pointerleave',leave);el.removeEventListener('keydown',keydown);geo.dispose();material.dispose();env.dispose();pmrem.dispose();room.dispose();renderer.dispose();renderer.domElement.remove()};
 }catch{if(!disposed)setFailed(true)}})();return()=>{disposed=true;cleanup()};},[]);
 return <div className="tooth-feature"><div className="tooth-orbit orbit-one"/><div className="tooth-orbit orbit-two"/><div ref={host} className="tooth-canvas" tabIndex={0} role="img" aria-label="Interactive chrome 3D tooth. Drag or use arrow keys to rotate.">{failed&&<ToothIcon size={170}/>}</div><div className="tooth-caption"><Rotate3D size={15}/><span>PRECISION IN EVERY DETAIL</span><span className="drag-hint">DRAG TO EXPLORE</span></div></div>
}
