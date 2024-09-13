import{p as U}from"./chunk-JJENOPKO.13837d65.js";import{aS as y,aT as z,aU as q,ap as j,q as Q,r as Z,s as H,g as J,c as K,b as X,_ as p,l as F,t as Y,d as tt,aq as et,aQ as at,aV as rt,k as nt}from"./index.56d3313d.js";import{p as it}from"./mermaid-parser.core.e3115af3.js";import{d as P}from"./arc.456e0cfa.js";import{o as st}from"./ordinal.d6400369.js";import"./_baseUniq.25f47b8a.js";import"./_basePickBy.81517635.js";import"./init.0b4a962a.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function ct(){var t=lt,a=ot,m=null,s=y(0),d=y(z),x=y(0);function i(e){var r,l=(e=q(e)).length,c,A,h=0,u=new Array(l),n=new Array(l),v=+s.apply(this,arguments),w=Math.min(z,Math.max(-z,d.apply(this,arguments)-v)),f,T=Math.min(Math.abs(w)/l,x.apply(this,arguments)),$=T*(w<0?-1:1),g;for(r=0;r<l;++r)(g=n[u[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?u.sort(function(S,C){return a(n[S],n[C])}):m!=null&&u.sort(function(S,C){return m(e[S],e[C])}),r=0,A=h?(w-l*$)/h:0;r<l;++r,v=f)c=u[r],g=n[c],f=v+(g>0?g*A:0)+$,n[c]={data:e[c],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(s=typeof e=="function"?e:y(+e),i):s},i.endAngle=function(e){return arguments.length?(d=typeof e=="function"?e:y(+e),i):d},i.padAngle=function(e){return arguments.length?(x=typeof e=="function"?e:y(+e),i):x},i}var R=j.pie,G={sections:new Map,showData:!1,config:R},b=G.sections,W=G.showData,ut=structuredClone(R),pt=p(()=>structuredClone(ut),"getConfig"),dt=p(()=>{b=new Map,W=G.showData,Y()},"clear"),gt=p(({label:t,value:a})=>{b.has(t)||(b.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>b,"getSections"),mt=p(t=>{W=t},"setShowData"),ht=p(()=>W,"getShowData"),I={getConfig:pt,clear:dt,setDiagramTitle:Q,getDiagramTitle:Z,setAccTitle:H,getAccTitle:J,setAccDescription:K,getAccDescription:X,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},vt=p((t,a)=>{U(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),St={parse:p(async t=>{const a=await it("pie",t);F.debug(a),vt(a,I)},"parse")},yt=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),xt=yt,At=p(t=>{const a=[...t.entries()].map(s=>({label:s[0],value:s[1]})).sort((s,d)=>d.value-s.value);return ct().value(s=>s.value)(a)},"createPieArcs"),wt=p((t,a,m,s)=>{F.debug(`rendering pie chart
`+t);const d=s.db,x=tt(),i=et(d.getConfig(),x.pie),e=40,r=18,l=4,c=450,A=c,h=at(a),u=h.append("g");u.attr("transform","translate("+A/2+","+c/2+")");const{themeVariables:n}=x;let[v]=rt(n.pieOuterStrokeWidth);v??=2;const w=i.textPosition,f=Math.min(A,c)/2-e,T=P().innerRadius(0).outerRadius(f),$=P().innerRadius(f*w).outerRadius(f*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=d.getSections(),S=At(g),C=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],D=st(C);u.selectAll("mySlices").data(S).enter().append("path").attr("d",T).attr("fill",o=>D(o.data.label)).attr("class","pieCircle");let N=0;g.forEach(o=>{N+=o}),u.selectAll("mySlices").data(S).enter().append("text").text(o=>(o.data.value/N*100).toFixed(0)+"%").attr("transform",o=>"translate("+$.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(d.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");const M=u.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(o,k)=>{const E=r+l,_=E*D.domain().length/2,V=12*r,B=k*E-_;return"translate("+V+","+B+")"});M.append("rect").attr("width",r).attr("height",r).style("fill",D).style("stroke",D),M.data(S).append("text").attr("x",r+l).attr("y",r-l).text(o=>{const{label:k,value:E}=o.data;return d.getShowData()?`${k} [${E}]`:k});const L=Math.max(...M.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),O=A+e+r+l+L;h.attr("viewBox",`0 0 ${O} ${c}`),nt(h,c,O,i.useMaxWidth)},"draw"),Ct={draw:wt},Ft={parser:St,db:I,renderer:Ct,styles:xt};export{Ft as diagram};
//# sourceMappingURL=pieDiagram-WEX7LNAG.267528e5.js.map
