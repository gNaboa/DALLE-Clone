import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(){
       const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length)
       const randomPrompt = surpriseMePrompts[randomIndex]

       return randomPrompt
}