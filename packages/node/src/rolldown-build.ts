import { Bundler } from '@rolldown/node-binding'
import { normalizeOutputOptions, OutputOptions } from './options/output-options'
import type { RollupBuild, SerializedTimings } from './rollup-types'
import { transformToRollupOutput, RolldownOutput, unimplemented } from './utils'

export class RolldownBuild implements RollupBuild {
  #bundler: Bundler
  constructor(bundler: Bundler) {
    this.#bundler = bundler
  }

  closed = false

  // @ts-expect-error 2416
  async generate(outputOptions: OutputOptions = {}): Promise<RolldownOutput> {
    const bindingOptions = normalizeOutputOptions(outputOptions)
    const output = await this.#bundler.write(bindingOptions)
    return transformToRollupOutput(output)
  }

  // @ts-expect-error 2416
  async write(outputOptions?: OutputOptions = {}): Promise<RolldownOutput> {
    const bindingOptions = normalizeOutputOptions(outputOptions)
    const output = await this.#bundler.write(bindingOptions)
    return transformToRollupOutput(output)
  }

  async close() {
    this.closed = true
  }

  // -- unimplemented

  get cache(): undefined {
    throw unimplemented()
    return unimplemented()
  }
  get watchFiles(): string[] {
    throw unimplemented()
    return unimplemented()
  }
  get getTimings(): () => SerializedTimings {
    throw unimplemented()
    return unimplemented()
  }
}
