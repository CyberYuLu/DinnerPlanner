import {dishesConst} from './dishesConst.js';
import { expect, assert } from 'chai';
import getModule from "./filesToTest.js";
import testComponent from './testComponentTL.js';
import makeModelProxyHandler from "./mockModel.js";

import {testVue, testReact, testWeek1Presenters} from "./rootUtils";


const X= TEST_PREFIX;

const SidebarView = (await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;
const SummaryView = (await getModule(`/src/views/${X}summaryView.vue`))?.default ||
      (await getModule(`/src/views/${X}summaryView.jsx`))?.SummaryView;

const SummaryVue=(await getModule(`/src/vuejs/${X}summaryPresenter.jsx`))?.Summary;
const SidebarVue=(await getModule(`/src/vuejs/${X}sidebarPresenter.jsx`))?.Sidebar;

const SummaryReact=(await getModule(`/src/reactjs/${X}summaryPresenter.jsx`))?.Summary;
const SidebarReact=(await getModule(`/src/reactjs/${X}sidebarPresenter.jsx`))?.Sidebar;

describe("TW1.2.2 Pass props from Presenter to View", function tw1_5_10() {
    this.timeout(200000);  // increase to allow debugging during the test run

    testComponent({
        vue: SummaryVue,
        react: SummaryReact, 
        mock: [{component: SummaryView, dummyText: "mock summary view"}]},
        [{model: new Proxy({numberOfGuests:2, dishes:[]}, makeModelProxyHandler("Summary presenter"))}, 
        {model: new Proxy({numberOfGuests:5, dishes:[]}, makeModelProxyHandler("Summary presenter"))}],
        "$framework Summary presenter renders SummaryView with people prop (replace TODO to enable)",
        function tw1_5_10_1_1(output, presenterPropsIndex, mockHandlers, test){
            if(mockHandlers[0]?.propsHistory[0]?.people?.indexOf?.("TODO")==0)
                test.skip();
            test._runnable.title= test._runnable.title.replace(/ *\([^)]*\) */g, "");              
        expect(output.queryByText(/mock summary view/), "summary presenter must always render summary view").to.be.ok;
        expect(mockHandlers[0]?.propsHistory[0], "Summary presenter expected to pass props").to.be.ok;
        expect(mockHandlers[0]?.propsHistory[0]?.people, "people prop passed to SummaryView should be the Model number of guests").to.be.equal(presenterPropsIndex?5:2);
        }
    );

    testComponent({
        vue: SummaryVue,
        react: SummaryReact,
        mock: [{component: SummaryView, dummyText: "mock summary view"}]},
        [{model:new Proxy({numberOfGuests:3, dishes:dishesConst.dishes1}, makeModelProxyHandler("Summary presenter"))},
        {model:new Proxy({numberOfGuests:5, dishes:dishesConst.dishes2}, makeModelProxyHandler("Summary presenter"))}],
        "$framework Summary presenter passes correct ingredients prop (replace TODO to enable)", 
        function tw1_5_10_2(output, presenterPropsIndex, mockHandlers, test){
            if(mockHandlers[0]?.propsHistory[0]?.ingredients?.indexOf?.("TODO")==0)
                test.skip();
            test._runnable.title= test._runnable.title.replace(/ *\([^)]*\) */g, "");
            expect(output.queryByText(/mock summary view/), "summary presenter must always render summary view").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0], "expecting summary presenter to pass props to SummaryView").to.be.ok;

            expect(mockHandlers[0]?.propsHistory[0]?.people, "expecting summary presenter to pass the correct number of people as prop").to.be.equal(presenterPropsIndex?5:3);

            const expectedIngr = presenterPropsIndex?dishesConst.ingrList2:dishesConst.ingrList1;
            const actualIngr = mockHandlers[0]?.propsHistory[0]?.ingredients;
            assert.equal(`length: ${actualIngr?.length}`, `length: ${expectedIngr.length}`, "expecting summary presenter to pass the ingredients prop based on model dishes")
            for (let i = 0; i<expectedIngr.length; i++) {
                assert.equal(actualIngr[i].name, expectedIngr[i].name, "expecting summary presenter to pass the ingredients prop based on model dishes")
            }
        }
    );

    testComponent({
        vue: SidebarVue,
        react: SidebarReact, 
        mock: [{component: SidebarView, dummyText: "mock sidebar view"}]},
        [{model: new Proxy({numberOfGuests:7, dishes:[]}, makeModelProxyHandler("Sidebar presenter"))}, 
        {model: new Proxy({numberOfGuests:10, dishes:[]}, makeModelProxyHandler("Sidebar presenter"))}],
        "$framework Sidebar presenter renders SidebarView with number prop [test UI](/tw1.5.1$linkSuffix.html)",
        function tw1_5_10_3(output, presenterPropsIndex, mockHandlers){
            expect(output.queryByText(/mock sidebar view/), "sidebar presenter must always render sidebar view").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0], "sidebar presenter must pass props to sidebar view").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0]?.number, "sidebar presenter must pass numberOfGuests as prop to sidebar view").to.be.equal(presenterPropsIndex?10:7);
        }
    );

    testComponent({
        vue: SidebarVue,
        react: SidebarReact,
        mock: [{component: SidebarView, dummyText: "mock sidebar view"}]},
        [{model: new Proxy({numberOfGuests:7, dishes:dishesConst.dishes1}, makeModelProxyHandler("Sidebar presenter"))}, 
         {model: new Proxy({numberOfGuests:10, dishes:dishesConst.dishes2}, makeModelProxyHandler("Sidebar presenter"))}],
        "$framework Sidebar presenter passes dishes prop", 
        function tw1_5_10_2(output, presenterPropsIndex, mockHandlers){
            expect(output.queryByText(/mock sidebar view/), "sidebar presenter must always render sidebar view").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0], "expecting sidebar presenter to pass props to SidebarView").to.be.ok;
            
            const expectedDishes = presenterPropsIndex?dishesConst.dishes2:dishesConst.dishes1;
            const actualDishes = mockHandlers[0]?.propsHistory[0]?.dishes;
            assert.equal(`length: ${actualDishes?.length}`, `length: ${expectedDishes.length}`, "expecting sidebar presenter to pass the correct dishes prop")
            for (let i = 0; i<expectedDishes.length; i++) {
                assert.equal(actualDishes[i].title, expectedDishes[i].title, "expecting sidebar presenter to pass the correct dishes prop")
                assert.equal(`id: ${actualDishes[i].id}`, `id: ${expectedDishes[i].id}`, "expecting sidebar presenter to pass the correct dishes prop")
            }
        }
                 );

     it("VueRoot renders Sidebar and Summary", async function tw1_1_5_2_vue_1(){
        if(!SidebarVue)
            this.skip();
        if(!await testVue(testWeek1Presenters))
            this.skip();
     });
       it("ReactRoot renders Sidebar and Summary", async function tw1_1_5_2_react_1(){
        if(!SidebarReact)
            this.skip();
        if(!await testReact(testWeek1Presenters))
            this.skip();
    });
});
