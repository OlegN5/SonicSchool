import sys
import ctcsound

csd_text = '''
  <CsoundSynthesizer>
  <CsOptions>
    -odac
  </CsOptions>
  <CsInstruments>
  instr 1
    out(linen(oscili(p4,p5),0.1,p3,0.1))
  endin
  </CsInstruments>
  <CsScore>
  i1 0 5 1000 440
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
