import {render} from "./teacherRender.js";
import {dishesConst} from "/test/dishesConst.js";

import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";

const X= TEST_PREFIX;

const SidebarView= !window.location.toString().includes("react") && (await getModule(`/src/views/${X}sidebarView.vue`))?.SidebarView ||
      (await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;


function getDishDetails(x){ return dishesConst.find(function(d){ return d.id===x;});}

if(!SidebarView)
    render(<div>Please define and export SidebarView in /src/views/sidebarView.jsx</div>,  document.getElementById('root'));

if(SidebarView){
    render(
        <div>
          This page tests TW1.3 Array Rendering in a SidebarView {getType(SidebarView)} for 5 people, with 3 dishes.
          <hr/>
          <SidebarView number={5} dishes={[getDishDetails(1), getDishDetails(2), getDishDetails(100), getDishDetails(200)]}  />
        </div>,
        document.getElementById('root')
    );
}

    
