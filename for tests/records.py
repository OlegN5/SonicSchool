import sys
import ctcsound

csd_text = '''
<CsoundSynthesizer>
<CsOptions>

</CsOptions>
<CsInstruments>
sr 		= 44100	;SAMPLE RATE
ksmps 	= 16	;NUMBER OF AUDIO SAMPLES IN EACH CONTROL CYCLE
nchnls 	= 2		;NUMBER OF CHANNELS (2=STEREO)


instr	1; ALWAYS ON - SEE SCORE
	kgain		invalue 	"Gain"
	ainL, ainR	ins
	outs ainL * kgain, ainR * kgain
endin
</CsInstruments>
<CsScore>
;INSTR | START | DURATION
i 1		0	   10	;INSTRUMENT 1 PLAYS FOR 1 HOUR (AND KEEPS PERFORMANCE GOING)
</CsScore>
</CsoundSynthesizer>'''

cs = ctcsound.Csound()
result = cs.compileCsdText(csd_text)
result = cs.start()
while True:
    result = cs.performKsmps()
    if result != 0:
        break
result = cs.cleanup()
cs.reset()
del cs
sys.exit(result)
